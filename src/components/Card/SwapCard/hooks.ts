import React, { useState, useEffect } from 'react';

import { Currency, CurrencyAmount, NATIVE, WNATIVE, JSBI, Percent, Token, Trade as V2Trade, TradeType, WNATIVE_ADDRESS, ChainId} from '@sushiswap/sdk'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import {getTokenAddress} from "../../../utils/addressHelpers"
import {useAllTokens} from "./allTokens"

import { useTokenContract,useBytes32TokenContract } from '../../../hooks/useContract';
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { useMemo } from 'react'

import { arrayify } from '@ethersproject/bytes'
import { parseBytes32String } from '@ethersproject/strings'

import { useSingleCallResult } from '../../../state/multicall/hooks';
import { useCurrencyBalances } from '../../../state/wallet/hooks';
import { tryParseAmount } from '../../../state/swap/hooks';

import { isAddress, isZero } from '../../../functions/validate'

import { useV2TradeExactIn as useTradeExactIn, useV2TradeExactOut as useTradeExactOut } from '../../../hooks/useV2Trades'
import useSwapSlippageTollerence from '../../../hooks/useSwapSlippageTollerence'

import {
  EstimatedSwapCall,
  SuccessfulCall,
  swapErrorToUserReadableMessage,
  useSwapCallArguments
} from '../../../hooks/useSwapCallback'


import {
  useExpertModeManager,
  useUserArcherETHTip,
  useUserArcherGasEstimate,
  useUserArcherGasPrice,
  useUserArcherTipManualOverride,
  useUserSingleHopOnly,
  useUserSlippageTolerance,
} from '../../../state/user/hooks'



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

export interface SwapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient?: string | null
}

export function useDerivedSwapInfo(typedValue:string): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  parsedAmount: CurrencyAmount<Currency> | undefined
  v2Trade: V2Trade<Currency, Currency, TradeType> | undefined
  inputError?: string
  allowedSlippage: Percent
} | null {
  const { account, library } = useActiveWeb3React()


  const [singleHopOnly] = useUserSingleHopOnly()

  const swapState: SwapState = {
  independentField: Field.INPUT,
  typedValue,
  [Field.INPUT]: {
    currencyId: 'ETH',
  },
  [Field.OUTPUT]: {
    currencyId: getTokenAddress('WNDR',chainId),
  },
  recipient: account,
}

console.log(">>>>>>>>",swapState)

console.log("independentField>>>", swapState.independentField)
console.log("typedValue>>>", swapState.typedValue)
console.log("inputCurrencyId>>>", swapState[Field.INPUT].currencyId)
console.log("outputCurrencyId>>>", swapState[Field.OUTPUT].currencyId)
console.log("recipient>>>", swapState.recipient)

let inputCurrencyId = swapState[Field.INPUT].currencyId
let outputCurrencyId = swapState[Field.OUTPUT].currencyId

const inputCurrency = useCurrency(inputCurrencyId)
const outputCurrency = useCurrency(outputCurrencyId)

console.log("inputCurrency, outputCurrency", inputCurrency, outputCurrency)
const to: any = account

const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
  inputCurrency ?? undefined,
  outputCurrency ?? undefined,
]) //

console.log("relevantTokenBalances>>>", relevantTokenBalances)

const isExactIn: boolean = swapState.independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)

  const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined, {
    maxHops: singleHopOnly ? 1 : undefined,
  })

  const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined, {
    maxHops: singleHopOnly ? 1 : undefined,
  })

  const v2Trade:any = isExactIn ? bestTradeExactIn : bestTradeExactOut

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
    inputError = 'Connect Wallet'
  }

  if (!parsedAmount) {
    inputError = inputError ?? (`Enter an amount`)
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    inputError = inputError ?? (`Select a token`)
  }

  const formattedTo = isAddress(to)
  if (!to || !formattedTo) {
    inputError = inputError ?? (`Enter a recipient`)
  } else {
    if (
      BAD_RECIPIENT_ADDRESSES?.[chainId]?.[formattedTo] ||
      (bestTradeExactIn && involvesAddress(bestTradeExactIn, formattedTo)) ||
      (bestTradeExactOut && involvesAddress(bestTradeExactOut, formattedTo))
    ) {
      inputError = inputError ?? (`Invalid recipient`)
    }
  }

  const allowedSlippage = useSwapSlippageTollerence(v2Trade)

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [currencyBalances[Field.INPUT], v2Trade?.maximumAmountIn(allowedSlippage)]

  if (balanceIn && amountIn && balanceIn.lessThan(amountIn)) {
    inputError = (`Insufficient ${amountIn.currency.symbol} balance`)
  }

  const swapCalls:any = useSwapCallArguments(v2Trade, allowedSlippage, to, undefined, false)

  const [, setUserETHTip] = useUserArcherETHTip()
  const [userGasEstimate, setUserGasEstimate] = useUserArcherGasEstimate()
  const [userGasPrice] = useUserArcherGasPrice()
  const [userTipManualOverride, setUserTipManualOverride] = useUserArcherTipManualOverride()


  useEffect(() => {
    async function estimateGas() {
      const estimatedCalls: any = await Promise.all(
        swapCalls.map((call:any) => {
          const { address, calldata, value } = call

          const tx:any =
            !value || isZero(value)
              ? { from: account, to: address, data: calldata }
              : {
                  from: account,
                  to: address,
                  data: calldata,
                  value,
                }

          return library
            ?.estimateGas(tx)
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
        (el: any, ix: number, list: string | any[]): el is SuccessfulCall =>
          'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1])
      )

      if (successfulEstimation) {
        setUserGasEstimate(successfulEstimation.gasEstimate.toString())
      }
    }
    if (v2Trade && swapCalls && !userTipManualOverride) {
      estimateGas()
    }
  }, [v2Trade, swapCalls, userTipManualOverride, library, setUserGasEstimate])

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

  if (isETH) {
    currencyId = WNATIVE_ADDRESS[chainId]
  }

  const token = useToken(useNative ? undefined : currencyId)

  // const extendedEther = useMemo(() => (chainId ? ExtendedEther.onChain(chainId) : undefined), [chainId])
  // const weth = chainId ? WETH9_EXTENDED[chainId] : undefined
  const native = useMemo(() => (chainId ? NATIVE[chainId] : undefined), [chainId])

  const wnative = chainId ? WNATIVE[chainId] : undefined

  if (wnative?.address?.toLowerCase() === currencyId?.toLowerCase()) return wnative

  return useNative ? native : token
}


export function useToken(tokenAddress?: string): Token | undefined | null {
  const tokens:any = useAllTokens()

  const address = isAddress(tokenAddress)

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined  = address ? tokens[address] : undefined

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
    chainId,
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


function involvesAddress(trade: V2Trade<Currency, Currency, TradeType>, checksummedAddress: string): boolean {
  const path = trade.route.path
  return (
    path.some((token) => token.address === checksummedAddress) ||
    (trade instanceof V2Trade
      ? trade.route.pairs.some((pair) => pair.liquidityToken.address === checksummedAddress)
      : false)
  )
}




// TODO: Swtich for ours...
const BAD_RECIPIENT_ADDRESSES: { [chainId: string]: { [address: string]: true } } = {
  [ChainId.MAINNET]: {
    '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac': true, // v2 factory
    '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F': true, // v2 router 02
  },
}

