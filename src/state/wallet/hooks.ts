import { Currency, CurrencyAmount, JSBI, NATIVE, Token } from '@sushiswap/sdk'
import { useMemo } from 'react'
import ERC20_INTERFACE from '../../config/abi/erc20'
import { useMulticallContract } from '../../hooks/useContract'
import { isAddress } from '../../functions/validate'
import { useSingleContractMultipleData, useMultipleContractSingleData } from '../multicall/hooks'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { useAllTokens } from '../../hooks/Tokens'
import { TokenBalancesMap } from './types'

/**
 * Returns a map of the given addresses to their eventually consistent BNB balances.
 */
export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
  [address: string]: CurrencyAmount<Currency> | undefined
} {
  const { chainId } = useActiveWeb3React()
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
          .map(isAddress)
          .filter((a): a is string => a !== false)
          .sort()
        : [],
    [uncheckedAddresses],
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map((address) => [address]),
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value && chainId)
          memo[address] = CurrencyAmount.fromRawAmount(NATIVE[chainId], JSBI.BigInt(value.toString()))
        return memo
      }, {}),
    [addresses, chainId, results]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [TokenBalancesMap, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens])

  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])

  const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<TokenBalancesMap>((memo, token, i) => {
            const value = balances?.[i]?.result?.[0]
            const amount = value ? JSBI.BigInt(value.toString()) : undefined
            if (amount) {
              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
            }
            return memo
          }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading,
  ]
}

export const serializeBalancesMap = (mapping: Record<string, CurrencyAmount<Token>>): string => {
  return Object.entries(mapping)
    .map(([address, currencyAmount]) => currencyAmount.serialize())
    .join()
}

export function useTokenBalances(address?: string, tokens?: (Token | undefined)[]): TokenBalancesMap {
  const balances = useTokenBalancesWithLoadingIndicator(address, tokens)[0]
  // const memoizedBalances = useMemo(() => serializeBalancesMap(balances), [balances])
  return useMemo(() => balances, [balances])
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount<Currency> | undefined)[] {
  const tokens = useMemo(
    () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
    [currencies]
  )

  console.log(">>>>>>tokens", tokens)

  const tokenBalances = useTokenBalances(account, tokens)
  console.log(">>>>>>>tokenBalances", tokenBalances)
  const containsETH: boolean = useMemo(() => currencies?.some((currency) => currency?.isNative) ?? false, [currencies])
  const ethBalance = useETHBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map((currency) => {
        if (!account || !currency) return undefined
        if (currency.isToken) return tokenBalances[currency.address]
        if (currency.isNative) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount<Currency> | undefined {
  return useCurrencyBalances(account, [currency])[0]
}

// mimics useAllBalances
export function useAllTokenBalances(): TokenBalancesMap {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray: any = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  return useTokenBalances(account ?? undefined, allTokensArray)
}
