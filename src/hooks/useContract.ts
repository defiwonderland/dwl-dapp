import { useMemo } from "react"
import useActiveWeb3React from "./useActiveWeb3React"
import { ethers } from "ethers"
import { Contract } from '@ethersproject/contracts'
import { getContract } from "../utils/getContract"


// Addresses
import {
    getBonusRewardAddress,
    getWonderVerseAddress,
    getMulticallAddress
} from "../utils/addressHelpers"

//ABI
import {ERC20_ABI,ERC20_BYTES32_ABI} from "../config/abi/erc20"
import BONUS_REWARD_ABI from "../config/abi/bonusReward.json"
import IDO_ABI from "../config/abi/ido.json"
import WONDER_VERSE_ABI from "../config/abi/wonderverse.json"
import multiCallAbi from '../config/abi/multicall.json'

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export function useContract(
    address: string | undefined,
    ABI: ethers.ContractInterface,
    withSignerIfPossible = true
): Contract | null {
    const { library, account } = useActiveWeb3React()

    return useMemo(() => {
        if (!address || !ABI || !library) return null
        try {
            return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
        } catch (error) {
            console.error('Failed to get contract', error)
            return null
        }
    }, [address, ABI, library, withSignerIfPossible, account])
}

export const useTokenContract = (address?: string, withSignerIfPossible?: boolean) => {
    return useContract(address, ERC20_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export const useBonusRewardContract = () => {
    return useContract(getBonusRewardAddress(chainId), BONUS_REWARD_ABI)
}

export const useIdoContract = (address: string) => {
    return useContract(address, IDO_ABI)
}

export const useWonderVerseContract = () => {
    return useContract(getWonderVerseAddress(chainId), WONDER_VERSE_ABI)
}


export function useMulticallContract(): Contract | null {
  return useContract(getMulticallAddress(chainId), multiCallAbi, false)
}
