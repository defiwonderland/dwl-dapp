import { useState, useEffect, useCallback } from "react"
import { useWonderVerseContract, useWonderVerseCollectionContract } from "./useContract"
import useRefresh from "./useRefresh"
import { Contract } from "@ethersproject/contracts"
import cities from "../config/constants/cities"
import { CityInfo, WonderVerseBaseInfo } from "../pages/Wonderverse/Map/types"
import { getBalanceNumber } from "../utils/formatBalance"
import { BigNumber } from "bignumber.js"
import axios from "axios"
import { Trait } from "../pages/Wonderverse/Map/WonderverseDetails"
import useActiveWeb3React from "./useActiveWeb3React"

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

export const useGetMintPrice = () => {
    const [mintPrice, setMintPrice] = useState<BigNumber>()
    const contract = useWonderVerseCollectionContract()

    const fetchData = useCallback(async () => {
        try {
            const response = await contract.mintPrice()
            setMintPrice(response)
        } catch (err: any) {
            console.error("Unable to fetch mint price", err.message)
        }
    }, [contract])


    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetchData();
        }
        return () => { mounted = false }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return mintPrice
}

export const useGetAllCollections = (account?: string) => {
    const [collections, setCollections] = useState<Trait[] | null>()
    const contract = useWonderVerseCollectionContract()

    const fetchData = useCallback(async () => {
        try {
            if (account) {
                const traits: Trait[] = [];

                const tokensOfOwner = await contract.tokensOfOwner(account)

                await Promise.all(tokensOfOwner.map(async (id: string) => {
                    const hash = await contract.tokenURI(id)
                    const { data } = await axios.get(hash)
                    traits.push({
                        id,
                        ...data
                    })
                }))
                setCollections(traits)

            }
        } catch (err: any) {
            console.error("Unable to fetch collections data", err.message)
        }
    }, [contract, account])


    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetchData();
        }
        return () => { mounted = false }
    }, [fetchData])

    return collections
}

