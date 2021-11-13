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

export const useFetchBalance = () => {
    const { account, library, chainId } = useActiveWeb3React()
    const [balance, setBalance] = useState<any>()

    useEffect((): any => {
        if (!!account && !!library) {
            let stale = false

            library
                .getBalance(account)
                .then((balance: any) => {
                    if (!stale) {
                        const formatBalance = getBalanceNumber(new BigNumber(balance.toHexString()))
                        setBalance(formatBalance)
                    }
                })
                .catch(() => {
                    if (!stale) {
                        setBalance(null)
                    }
                })

            return () => {
                stale = true
                setBalance(undefined)
            }
        }
    }, [account, library, chainId])

    return balance
}

