import { useMemo } from "react"
import useActiveWeb3React from "./useActiveWeb3React"
import { ethers } from "ethers"
import { Contract } from '@ethersproject/contracts'
import { getContract } from "../utils/getContract"

// Addresses
import {
    getBonusRewardAddress
} from "../utils/addressHelpers"

//ABI
import bonusRewardABI from "../config/abi/bonusReward.json"
import erc20ABI from "../config/abi/erc20.json"
import idoABI from "../config/abi/ido.json"

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

export const useERC20 = (address: string) => {
    return useContract(address, erc20ABI)
}

export const useBonusRewardContract = () => {
    return useContract(getBonusRewardAddress(chainId), bonusRewardABI)
}

export const useIdoContract = (address: string) => {
    return useContract(address, idoABI)
}