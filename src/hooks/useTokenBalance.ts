import { useState, useEffect, useCallback } from 'react'
import useActiveWeb3React from './useActiveWeb3React'
import BigNumber from 'bignumber.js'
import useRefresh from './useRefresh'
import { Contract } from '@ethersproject/contracts'
import { getBalanceNumber } from '../utils/formatBalance'

export const useTokenBalance = (tokenContract: Contract, decimals = 18) => {
    const [balance, setBalance] = useState<number>()
    const { account } = useActiveWeb3React()
    const { fastRefresh } = useRefresh()

    const fetchBalance = useCallback(async () => {
        const res = await tokenContract.balanceOf(account)
        const bigNumberBalance = new BigNumber(res.toHexString())
        setBalance(getBalanceNumber(bigNumberBalance, decimals))
    }, [account, tokenContract, decimals])

    useEffect(() => {
        let mounted = true
        if (account && mounted) {
            fetchBalance()
        }
        return () => { mounted = false }
    }, [account, tokenContract, fastRefresh, decimals, fetchBalance])

    return balance
}