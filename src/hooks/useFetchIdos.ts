import React, { useState, useEffect, useCallback } from "react"
import multicall from "../utils/multicall"
import idos from "../config/constants/idos"
import useRefresh from "./useRefresh"
import { getIdoAddress } from "../utils/addressHelpers"
import idoABI from "../config/abi/ido.json"
import { getBalanceNumber } from "../utils/formatBalance"

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const useFetchIdos = () => {
    const [newIdos, setNewIdos] = useState(idos)
    const { slowRefresh } = useRefresh()

    const fetchIdos = useCallback(async () => {
        const data = await Promise.all(
            idos.map(async (ido) => {
                const calls = [
                    {
                        address: getIdoAddress(ido, chainId),
                        name: '_closingTime',
                    },

                    {
                        address: getIdoAddress(ido, chainId),
                        name: '_openingTime'
                    },

                    {
                        address: getIdoAddress(ido, chainId),
                        name: '_rate'
                    },

                    {
                        address: getIdoAddress(ido, chainId),
                        name: 'hasClosed'
                    },

                    {
                        address: getIdoAddress(ido, chainId),
                        name: 'isOpen'
                    },

                    {
                        address: getIdoAddress(ido, chainId),
                        name: 'remainingTokens'
                    },
                ]

                const [closingTime, openingTime, rate, hasClosed, isOpen, remainingTokens] = await multicall(idoABI, calls)

                return {
                    closingTime: closingTime[0].toNumber(),
                    openingTime: openingTime[0].toNumber(),
                    rate: rate[0].toNumber(),
                    hasClosed: hasClosed[0],
                    isOpen: isOpen[0],
                    remainingTokens: getBalanceNumber(remainingTokens[0].toHexString(), ido.tokenDecimals)
                }
            })
        )

        let results: any = []

        idos.map((ido, index) => {
            results.push({
                ...ido,
                closingTime: data[index].closingTime,
                openingTime: data[index].openingTime,
                rate: data[index].rate,
                hasClosed: data[index].hasClosed,
                isOpen: data[index].isOpen,
                remainingTokens: data[index].remainingTokens
            })

            return true
        })

        setNewIdos(results)
    }, [])


    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetchIdos()
        }
        return () => { mounted = false }
    }, [slowRefresh, fetchIdos])

    return newIdos
}