import tokenInfo from "../config/constants/tokenInfo";
import lpAddresses from "../config/constants/lpAddress";
import contractAddresses from "../config/constants/contractAddress";
import { ChainId } from "../config";
import { IdoConfig } from "../config/types";

// get contract addresses
export const getBonusRewardAddress = (chainId: ChainId) => {
    return contractAddresses.bonusReward[chainId]
}

export const getMulticallAddress = (chainId: ChainId) => {
    return contractAddresses.mulltiCall[chainId]
}

export const getPriceFeedAddress = (chainId: ChainId) => {
    return contractAddresses.priceFeed[chainId]
}

export const getIdoAddress = (ido: IdoConfig, chainId: ChainId) => {
    return ido.idoAddress[chainId]
}

export const getMainTokenSymbol = (ido: IdoConfig, chainId: ChainId) => {
    return ido.mainToken[chainId]
}

// get token addresses
export const getTokenAddress = (token: string, chainId: ChainId) => {
    return tokenInfo[token.toUpperCase()].address[chainId]
}

// get lp token addresses
export const getWndrMaticAddress = (chainId: ChainId) => {
    return lpAddresses.wndr_matic[chainId]
}

export const getWndrEthAddress = (chainId: ChainId) => {
    return lpAddresses.wndr_eth[chainId]
}