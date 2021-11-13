import { useState, useEffect, useCallback } from "react"
import { useWonderVerseContract } from "./useContract"
import useRefresh from "./useRefresh"
import { Contract } from "@ethersproject/contracts"
import cities from "../config/constants/cities"
import { CityInfo, WonderVerseBaseInfo } from "../pages/Wonderverse/Map/types"
import { getBalanceNumber } from "../utils/formatBalance"
import { BigNumber } from "bignumber.js"

export const useGetWonderVerseDetails = () => {
    const [newCityDetails, setNewCityDetails] = useState<CityInfo[]>([])
    const contract = useWonderVerseContract() as Contract
    const { fastRefresh } = useRefresh()

    const fetchData = useCallback(async () => {
        try {
            const allCityInfo = await contract.getAllBillBoards()
            const newCities: any = {}

            allCityInfo.forEach((cityInfo: any) => {
                const { id, desc, owner, ipfsHash, bidLevel, twitter } = cityInfo;
                const isBid = cityInfo.init;

                newCities[id] = {
                    id,
                    desc,
                    twitter,
                    isBid,
                    owner,
                    ipfsHash,
                    bidLevel
                }
            })

            let cityDetetails: any = []

            cities.forEach(city => {
                const { id } = city
                const cityData = newCities[id]

                if (cityData) {
                    cityDetetails.push({
                        ...city,
                        ...cityData
                    })
                } else {
                    cityDetetails.push(city)
                }
            })

            setNewCityDetails(cityDetetails)

        } catch (err: any) {
            console.error("Unable to fetch wonderverse city details", err.message)
        }
    }, [contract])

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetchData()
        }
        return () => { mounted = false }
    }, [fastRefresh, fetchData])

    return newCityDetails
}

export const useFetchWonderVerseBaseInfo = () => {
    const [baseInfo, setBaseInfo] = useState<WonderVerseBaseInfo>({ basePrice: 0, minimumTokenAmount: 0 })
    const contract = useWonderVerseContract() as Contract
    const { slowRefresh } = useRefresh()

    const fetchData = useCallback(async () => {
        try {
            const [basePrice, minimumTokenAmount] = await Promise.all([
                contract.basePrice(),
                contract.minimumTokenAmountToCreate(),
            ])

            setBaseInfo({
                basePrice: getBalanceNumber(new BigNumber(basePrice.toHexString())),
                minimumTokenAmount: getBalanceNumber(new BigNumber(minimumTokenAmount.toHexString()))
            })
        } catch (err: any) {
            console.error("Unable to fetch wonderverse base info", err.message)
        }
    }, [contract])

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetchData()
        }
        return () => { mounted = false }
    }, [slowRefresh, fetchData])

    return baseInfo
}

