import { Currency, CurrencyAmount, NATIVE, JSBI, Percent, Token, Trade as V2Trade, TradeType } from '@sushiswap/sdk'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { useAllTokens } from '../../../hooks/Tokens';
import { isAddress, isZero } from '../../../functions/validate'
import { useTokenContract, useBytes32TokenContract } from '../../../hooks/useContract';
import { useMemo, useEffect } from 'react'
import { arrayify } from '@ethersproject/bytes'
import { parseBytes32String } from '@ethersproject/strings'
import { DEFAULT_ARCHER_ETH_TIP, DEFAULT_ARCHER_GAS_ESTIMATE } from '../../../config/constants/archer'

import { useSingleCallResult } from '../../../state/multicall/hooks';
import { useCurrencyBalances } from '../../../state/wallet/hooks';
import { tryParseAmount } from '../../../functions/parse';

import { useV2TradeExactIn as useTradeExactIn, useV2TradeExactOut as useTradeExactOut } from '../../../hooks/useV2Trades'
import useSwapSlippageTolerance from "../../../hooks/useSwapSlippageTolerance"

import {
  useUserArcherETHTip,
  useUserArcherGasEstimate,
  useUserArcherGasPrice,
  useUserArcherTipManualOverride,
  useUserSingleHopOnly,
} from '../../../state/user/hooks'
import {
  useSwapCallArguments,
  swapErrorToUserReadableMessage,
  EstimatedSwapCall,
  SwapCall,
  SuccessfulCall
} from '../../../hooks/useSwapCallback';

import { useSwapState } from '../../../state/swap/hooks';

export interface ListenerOptions {
  // how often this data should be fetched, by default 1
  readonly blocksPerFetch?: number
}

export const NEVER_RELOAD: ListenerOptions = {
  blocksPerFetch: Infinity,
}

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export function useDerivedSwapInfo(doArcher = false): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  parsedAmount: CurrencyAmount<Currency> | undefined
  inputError?: string
  v2Trade: V2Trade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
} {
  const { account, library } = useActiveWeb3React()

  const [singleHopOnly] = useUserSingleHopOnly()

  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    recipient,
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const to: string | null | undefined = recipient

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ]) //

  const isExactIn: boolean = independentField === Field.INPUT

  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)

  const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined, {
    maxHops: singleHopOnly ? 1 : undefined,
  })

  const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined, {
    maxHops: singleHopOnly ? 1 : undefined,
  })

  const v2Trade: any = isExactIn ? bestTradeExactIn : bestTradeExactOut

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  let inputError: string | undefined
  if (!account) {
    inputError = "Connect Wallet"
  }

  if (!parsedAmount) {
    inputError = inputError ?? "Enter an amount"
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    inputError = inputError ?? "Select a token"
  }

  const allowedSlippage = useSwapSlippageTolerance(v2Trade)

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], v2Trade?.maximumAmountIn(allowedSlippage)]

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = `Insufficient ${amountIn.currency.symbol} balance`
  }

  const swapCalls = useSwapCallArguments(v2Trade, allowedSlippage, to, undefined, false)

  const [, setUserETHTip] = useUserArcherETHTip()
  const [userGasEstimate, setUserGasEstimate] = useUserArcherGasEstimate()
  const [userGasPrice] = useUserArcherGasPrice()
  const [userTipManualOverride, setUserTipManualOverride] = useUserArcherTipManualOverride()

  useEffect(() => {
    if (doArcher) {
      setUserTipManualOverride(false)
      setUserETHTip(DEFAULT_ARCHER_ETH_TIP.toString())
      setUserGasEstimate(DEFAULT_ARCHER_GAS_ESTIMATE.toString())
    }
  }, [doArcher, setUserTipManualOverride, setUserETHTip, setUserGasEstimate])

  useEffect(() => {
    if (doArcher && !userTipManualOverride) {
      setUserETHTip(JSBI.multiply(JSBI.BigInt(userGasEstimate), JSBI.BigInt(userGasPrice)).toString())
    }
  }, [doArcher, userGasEstimate, userGasPrice, userTipManualOverride, setUserETHTip])

  useEffect(() => {
    async function estimateGas() {
      const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
        swapCalls.map((call: SwapCall) => {
          const { address, calldata, value } = call

          const tx =
            !value || isZero(value)
              ? { from: account, to: address, data: calldata }
              : {
                from: account,
                to: address,
                data: calldata,
                value,
              }

          return library
            .estimateGas(tx)
            .then((gasEstimate) => {
              return {
                call,
                gasEstimate,
              }
            })
            .catch((gasError) => {
              console.debug('Gas estimate failed, trying eth_call to extract error', call)

              return library
                .call(tx)
                .then((result) => {
                  console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                  return {
                    call,
                    error: new Error('Unexpected issue with estimating the gas. Please try again.'),
                  }
                })
                .catch((callError) => {
                  console.debug('Call threw error', call, callError)
                  return {
                    call,
                    error: new Error(swapErrorToUserReadableMessage(callError)),
                  }
                })
            })
        })
      )

      // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
      const successfulEstimation = estimatedCalls.find(
        (el, ix, list): el is SuccessfulCall =>
          'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
      )

      if (successfulEstimation) {
        setUserGasEstimate(successfulEstimation.gasEstimate.toString())
      }
    }
    if (doArcher && v2Trade && swapCalls && !userTipManualOverride) {
      estimateGas()
    }
  }, [doArcher, v2Trade, swapCalls, userTipManualOverride, account, library, setUserGasEstimate])

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    inputError,
    v2Trade: v2Trade ?? undefined,
    allowedSlippage,
  }
}

export function useCurrency(currencyId: string | undefined): Currency | null | undefined {

  const isETH = currencyId?.toUpperCase() === 'ETH'
  const useNative = isETH

  const token = useToken(useNative ? undefined : currencyId)

  const native = useMemo(() => (chainId ? NATIVE[chainId] : undefined), [])

  return useNative ? native : token
}

export function useToken(tokenAddress?: string): Token | undefined | null {
  const tokens: any = useAllTokens()
  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
      ? parseBytes32String(bytes32)
      : defaultValue
}