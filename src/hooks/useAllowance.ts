import { useState, useEffect, useCallback, useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { getBonusRewardAddress } from '../utils/addressHelpers'
import useRefresh from './useRefresh'
import { Contract } from '@ethersproject/contracts'
import { CurrencyAmount, Token } from '@sushiswap/sdk'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useTokenContract } from './useContract'

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const useBonusRewardAllowance = (tokenContract: Contract) => {
    const { account } = useActiveWeb3React()
    const [allowance, setAllowance] = useState<BigNumber | null>(null)
    const { fastRefresh } = useRefresh()

    const fetchAllowance = useCallback(async () => {
        try {
            const res = await tokenContract.allowance(account, getBonusRewardAddress(chainId))
            setAllowance(new BigNumber(res.toHexString()))
        } catch (e) {
            setAllowance(null)
        }
    }, [tokenContract, account])

    useEffect(() => {
        let mounted = true
        if (account && mounted) {
            fetchAllowance()
        }
        return () => { mounted = false }

    }, [account, tokenContract, fastRefresh, fetchAllowance])

    return allowance
}


export const useWndrAllowance = (wndrContract: Contract, contractAddress: string) => {
    const { account } = useActiveWeb3React()
    const [allowance, setAllowance] = useState<BigNumber | null>(null)
    const { fastRefresh } = useRefresh()

    const fetchAllowance = useCallback(async () => {
        try {
            const res = await wndrContract.allowance(account, contractAddress)
            setAllowance(new BigNumber(res.toHexString()))
        } catch (e) {
            setAllowance(null)
        }
    }, [wndrContract, contractAddress, account])

    useEffect(() => {
        let mounted = true
        if (account && mounted) {
            fetchAllowance()
        }
        return () => { mounted = false }

    }, [account, wndrContract, fastRefresh, fetchAllowance])

    return allowance
}

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): CurrencyAmount<Token> | undefined {
    const contract = useTokenContract(token?.address, false)

    const inputs = useMemo(() => [owner, spender], [owner, spender])
    const allowance = useSingleCallResult(contract, 'allowance', inputs).result

    return useMemo(
        () => (token && allowance ? CurrencyAmount.fromRawAmount(token, allowance.toString()) : undefined),
        [token, allowance]
    )
}