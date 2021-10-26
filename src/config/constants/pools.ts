import { FarmConfig } from "../types";
import { getTokenAddress } from "../../utils/addressHelpers";
import { getTokenDecimals } from "../../utils/decimalHelpers";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const pools: FarmConfig[] = [
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
]