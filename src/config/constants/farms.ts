import { FarmConfig } from "../types";
import {
    getTokenAddress,
    getWndrEthAddress,
    getWndrMaticAddress,
    getWndrSushiAddress
} from "../../utils/addressHelpers";
import { getTokenDecimals } from "../../utils/decimalHelpers";
import { ChainId } from "..";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

interface FarmDetails {
    [ChainId.MATIC]: FarmConfig[],
    [ChainId.KOVAN]: FarmConfig[],
    [ChainId.MATIC_TESTNET]: FarmConfig[],
}

const farmDetails: FarmDetails = {
    [ChainId.MATIC]: [],
    [ChainId.KOVAN]: [
        {
            pid: 0,
            stakeToken: {
                symbol: 'WNDR-ETH',
                address: getWndrEthAddress(chainId),
                decimals: 18
            },
            rewardToken: {
                symbol: "WNDR",
                address: getTokenAddress("WNDR", chainId),
                decimals: getTokenDecimals("WNDR")
            },
        },
        {
            pid: 1,
            stakeToken: {
                symbol: 'WNDR-SUSHI',
                address: getWndrSushiAddress(chainId),
                decimals: 18
            },
            rewardToken: {
                symbol: "WNDR",
                address: getTokenAddress("WNDR", chainId),
                decimals: getTokenDecimals("WNDR")
            },
        },
    ],
    [ChainId.MATIC_TESTNET]: [
        {
            pid: 0,
            stakeToken: {
                symbol: 'WNDR-MATIC',
                address: getWndrMaticAddress(chainId),
                decimals: 18
            },
            rewardToken: {
                symbol: "WNDR",
                address: getTokenAddress("WNDR", chainId),
                decimals: getTokenDecimals("WNDR")
            },
        }
    ],
}

export const farms = (chainId: ChainId) => {
    return farmDetails[chainId]
}