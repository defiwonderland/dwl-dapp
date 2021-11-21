import { useMemo } from "react"
import useActiveWeb3React from "./useActiveWeb3React"
import { ethers } from "ethers"
import { Contract } from '@ethersproject/contracts'
import { getContract } from "../utils/getContract"


// Addresses
import {
    getBonusRewardAddress,
    getWonderVerseAddress,
    getMulticall2Address,
    getFactoryAddress
} from "../utils/addressHelpers"

import {
    ARCHER_ROUTER_ADDRESS,
    ChainId,
    ROUTER_ADDRESS,
} from '@sushiswap/sdk'

//ABI
import { ERC20_ABI, ERC20_BYTES32_ABI } from "../config/abi/erc20"
import BONUS_REWARD_ABI from "../config/abi/bonusReward.json"
import IDO_ABI from "../config/abi/ido.json"
import WONDER_VERSE_ABI from "../config/abi/wonderverse.json"
import MULTICALL2_ABI from '../config/abi/multicall2.json'
import ROUTER_ABI from '../config/abi/router.json'
import FACTORY_ABI from '../config/abi/factory.json'
import EIP_2612_ABI from '../config/abi/eip-2612.json'
import {
    ARGENT_WALLET_DETECTOR_ABI,
    ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS,
} from '../config/abi/argent-wallet-detector'

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
    return useContract(getMulticall2Address(chainId), MULTICALL2_ABI, false)
}

export function useFactoryContract(): Contract | null {
    return useContract(getFactoryAddress(chainId), FACTORY_ABI, false)
}

export function useRouterContract(useArcher = false, withSignerIfPossible?: boolean): Contract | null {
    const address = useArcher ? ARCHER_ROUTER_ADDRESS[chainId] : ROUTER_ADDRESS[chainId]
    const abi = ROUTER_ABI

    return useContract(address, abi, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
    return useContract(
        chainId === ChainId.MAINNET ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
        ARGENT_WALLET_DETECTOR_ABI,
        false
    )
}

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
    return useContract(tokenAddress, EIP_2612_ABI, false)
}


