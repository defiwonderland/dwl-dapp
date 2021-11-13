import { useState, useEffect, useCallback } from 'react'
import useActiveWeb3React from './useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { getBonusRewardAddress } from '../utils/addressHelpers'
import useRefresh from './useRefresh'
import { Contract } from '@ethersproject/contracts'

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