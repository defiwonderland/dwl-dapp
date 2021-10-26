import { useState, useEffect, useCallback } from "react";
import multicall from "../utils/multicall";
import bonusRewardABI from "../config/abi/bonusReward.json"
import { getBonusRewardAddress } from "../utils/addressHelpers";
import { getBalanceNumber } from "../utils/formatBalance";
import useRefresh from "./useRefresh";
import { FarmConfig } from "../config/types";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const useFetchFarms = (farmsConfg: FarmConfig[], account?: string | undefined | null) => {
    const [newFarm, setNewFarm] = useState(farmsConfg)
    const { slowRefresh } = useRefresh()

    const fetchFarmWithRewards = useCallback(async () => {
        const data = await Promise.all(
            farmsConfg.map(async (farm) => {
                const calls = [
                    {
                        address: getBonusRewardAddress(chainId),
                        name: 'viewRewards',
                        params: [farm.stakeToken.address, account],
                    },

                    {
                        address: getBonusRewardAddress(chainId),
                        name: 'getUser',
                        params: [farm.stakeToken.address, account],
                    }
                ]

                const [rewards, stakeTokenNumber] = await multicall(bonusRewardABI, calls)

                return {
                    farmRewards: rewards[0],
                    farmStakeTokenAmount: stakeTokenNumber[0][0]
                }
            })
        )

        let results: any = []

        farmsConfg.map((farm, index) => {
            const farmRewardsTokenDecimals = farm.rewardToken.decimals
            const farmStakeTokenDecimals = farm.stakeToken.decimals
            const rewards = getBalanceNumber(data[index].farmRewards[0]._hex, farmRewardsTokenDecimals)
            const stakeTokenNumber = getBalanceNumber(data[index].farmStakeTokenAmount._hex, farmStakeTokenDecimals)

            results.push({
                ...farm,
                rewards,
                stakeTokenNumber,
            })

            return true
        })

        setNewFarm(results)

    }, [farmsConfg, account])

    useEffect(() => {
        let mounted = true;
        if (account && mounted) {
            fetchFarmWithRewards()
        }
        return () => { mounted = false }
    }, [account, slowRefresh, fetchFarmWithRewards])

    return newFarm
}