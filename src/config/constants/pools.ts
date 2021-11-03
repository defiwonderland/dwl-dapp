import { FarmConfig } from "../types";
import { getTokenAddress } from "../../utils/addressHelpers";
import { getTokenDecimals } from "../../utils/decimalHelpers";
import { ChainId } from "..";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

interface PoolDetails {
    [ChainId.MATIC]: FarmConfig[],
    [ChainId.KOVAN]: FarmConfig[],
    [ChainId.MATIC_TESTNET]: FarmConfig[],
}

const poolDetails: PoolDetails = {
    [ChainId.MATIC]: [],
    [ChainId.KOVAN]: [
        {
            pid: 0,
            stakeToken: {
                symbol: 'WNDR',
                address: getTokenAddress("WNDR", chainId),
                decimals: getTokenDecimals("WNDR")
            },
            rewardToken: {
                symbol: "ETH",
                address: getTokenAddress("ETH", chainId),
                decimals: getTokenDecimals("ETH")
            },
        }
    ],
    [ChainId.MATIC_TESTNET]: [
        {
            pid: 0,
            stakeToken: {
                symbol: 'WNDR',
                address: getTokenAddress("WNDR", chainId),
                decimals: getTokenDecimals("WNDR")
            },
            rewardToken: {
                symbol: "ETH",
                address: getTokenAddress("ETH", chainId),
                decimals: getTokenDecimals("ETH")
            },
        }
    ],
}

export const pools = (chainId: ChainId) => {
    return poolDetails[chainId]
}