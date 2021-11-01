import { useState, useEffect } from "react"
import useActiveWeb3React from "./useActiveWeb3React"
import { getBalanceNumber } from "../utils/formatBalance"
import BigNumber from "bignumber.js"

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