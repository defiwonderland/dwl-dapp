import { FarmConfig } from "../types";
import { getTokenAddress } from "../../utils/addressHelpers";
import { getWndrMaticAddress } from "../../utils/addressHelpers";
import { getTokenDecimals } from "../../utils/decimalHelpers";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const farms: FarmConfig[] = [
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
]