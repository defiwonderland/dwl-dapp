import { useState, useEffect, useCallback } from "react";
import multicall from "../utils/multicall";
import bonusRewardABI from "../config/abi/bonusReward.json"
import priceFeedABI from "../config/abi/priceFeed.json"
import { getBonusRewardAddress, getPriceFeedAddress } from "../utils/addressHelpers";
import { getBalanceNumber } from "../utils/formatBalance";
import useRefresh from "./useRefresh";
import { fetchPrice, fetchWndrPrice } from "../utils/fetchTokenPrice";
import { getTokenAddress } from "../utils/addressHelpers";
import { getTokenDecimals } from "../utils/decimalHelpers";
import { FarmConfig } from "../config/types";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const useFetchEarnings = (farmsConfig: FarmConfig[], isLp: boolean) => {
    const [earnings, setEarnings] = useState<any[]>([]);
    const { slowRefresh } = useRefresh()

    const fetchPoolInfo = useCallback(async () => {
        let results: any[] = []
        const now = Math.floor(Date.now() / 1000)
        const tokenPrice = await fetchPrice()
        const wndrMatic = await fetchWndrPrice()
        const wndrPrice = { "WNDR": Number(wndrMatic) * tokenPrice["MATIC"] }
        const newTokenPrice = Object.assign(tokenPrice, wndrPrice)

        const calls = farmsConfig.map((farm) => ({
            address: getBonusRewardAddress(chainId),
            name: 'getPool',
            params: [farm.stakeToken.address],
        }))

        const poolInfo = await multicall(bonusRewardABI, calls)
        let lpInfo: any[] = []

        if (isLp) {
            const lpFarmsCalls = farmsConfig.map((farm) => ({
                address: getPriceFeedAddress(chainId),
                name: 'getLPTotalValue',
                params: [farm.stakeToken.address]
            }))

            lpInfo = await multicall(priceFeedABI, lpFarmsCalls)
        }

        farmsConfig.map((farm, index) => {
            let yearlyRewardsValue: number = 0
            let apr: number = 0;
            let tvl: number = 0;
            let isEnded: boolean;
            let isRemBonusEnough: boolean;

            const symbol = farm.stakeToken.symbol
            const stakeTokenDecimal = farm.stakeToken.decimals
            const stakeTokenTotalAmount = getBalanceNumber(poolInfo[index][0].amount._hex, stakeTokenDecimal)

            if (!isLp) {
                tvl = stakeTokenTotalAmount * newTokenPrice[symbol]
            } else {
                const tokenArray = lpInfo[index][0]
                const token1 = tokenArray[0]
                const tokenLocal1 = getTokenAddress(symbol.split("-")[0], chainId)
                let decimal1 = 0
                let decimal2 = 0
                let tokenName1 = ""
                let tokenName2 = ""

                if (token1 === tokenLocal1) {
                    tokenName1 = symbol.split("-")[0]
                    tokenName2 = symbol.split("-")[1]
                    decimal1 = getTokenDecimals(tokenName1)
                    decimal2 = getTokenDecimals(tokenName2)
                } else {
                    tokenName1 = symbol.split("-")[1]
                    tokenName2 = symbol.split("-")[0]
                    decimal1 = getTokenDecimals(tokenName1)
                    decimal2 = getTokenDecimals(tokenName2)
                }

                const [tokenAmount1, tokenAmount2] = lpInfo[index][1]
                const formatTokenAmount1 = getBalanceNumber(tokenAmount1._hex, decimal1)
                const formatTokenAmount2 = getBalanceNumber(tokenAmount2._hex, decimal2)

                const totalSupply = lpInfo[index][2]
                const formatTotalSupply = getBalanceNumber(totalSupply._hex)
                tvl = (formatTokenAmount1 * newTokenPrice[tokenName1] + formatTokenAmount2 * newTokenPrice[tokenName2]) / formatTotalSupply * stakeTokenTotalAmount
            }

            const rewardTokenSymbol = farm.rewardToken.symbol
            const rewardTokenDecimals = farm.rewardToken.decimals

            const weeklyReward = poolInfo[index][0][0][0].weeklyRewards
            const endTime = poolInfo[index][0][0][0].endTime
            const remBonusValue = poolInfo[index][0][0][0].remBonus

            const formatWeeklyReward = getBalanceNumber(weeklyReward._hex, rewardTokenDecimals)
            const formatRemBonusValue = getBalanceNumber(remBonusValue._hex, rewardTokenDecimals)

            const yearlyReward = formatWeeklyReward / 7 * 365

            isEnded = endTime < now
            isRemBonusEnough = formatRemBonusValue > 0
            yearlyRewardsValue = yearlyReward * newTokenPrice[rewardTokenSymbol]

            const isFarmEnded = isEnded && !isRemBonusEnough

            apr = tvl === 0 ? 0 : yearlyRewardsValue / tvl * 100

            results.push({
                apr: apr.toFixed(3),
                tvl: tvl.toFixed(3),
                isRemBonusEnough,
                isFarmEnded,
                endTime,
                totalStakeTokenNumber: stakeTokenTotalAmount
            })
            return true
        })
        setEarnings(results)
    }, [farmsConfig, isLp])

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetchPoolInfo()
        }
        return () => { mounted = false }

    }, [slowRefresh, fetchPoolInfo])

    return earnings
}