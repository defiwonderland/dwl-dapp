import { Currency, CurrencyAmount, NATIVE, WNATIVE, JSBI, Percent, Token, Trade as V2Trade, TradeType, WNATIVE_ADDRESS, ChainId } from '@sushiswap/sdk'
import useActiveWeb3React from '../../../hooks/useActiveWeb3React';
import { getTokenAddress } from "../../../utils/addressHelpers"
import { useAllTokens } from '../../../hooks/Tokens';
import { isAddress } from "../../../utils/getContract"
import { useTokenContract, useBytes32TokenContract } from '../../../hooks/useContract';
import { useMemo } from 'react'

import { arrayify } from '@ethersproject/bytes'
import { parseBytes32String } from '@ethersproject/strings'

import { useSingleCallResult } from '../../../state/multicall/hooks';
import { useCurrencyBalances } from '../../../state/wallet/hooks';



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

export function useDerivedSwapInfo(typedValue: string): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  parsedAmount: CurrencyAmount<Currency> | undefined
  v2Trade: V2Trade<Currency, Currency, TradeType> | undefined
  inputError?: string
} | null {
  const { account } = useActiveWeb3React()

  const swapState: SwapState = {
    independentField: Field.INPUT,
    typedValue,
    [Field.INPUT]: {
      currencyId: 'ETH',
    },
    [Field.OUTPUT]: {
      currencyId: getTokenAddress('WNDR', chainId),
    },
    recipient: account,
  }

  console.log(">>>>>>>>", swapState)

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
  const to: string | null | undefined = account

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ]) //

  console.log("relevantTokenBalances>>>", relevantTokenBalances)

  // {
  //   currencies,
  //   currencyBalances,
  //   parsedAmount,
  //   v2Trade: v2Trade ?? undefined,
  //   inputError,
  // }

  return null
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