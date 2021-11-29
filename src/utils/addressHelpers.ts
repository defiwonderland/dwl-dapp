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
    return contractAddresses.mullticall[chainId]
}

export const getMulticall2Address = (chainId: ChainId) => {
    return contractAddresses.mullticall2[chainId]
}

export const getPriceFeedAddress = (chainId: ChainId) => {
    return contractAddresses.priceFeed[chainId]
}

export const getIdoAddress = (ido: IdoConfig, chainId: ChainId) => {
    return ido.idoAddress[chainId]
}

export const getWonderVerseAddress = (chainId: ChainId) => {
    return contractAddresses.wonderVerse[chainId]
}

export const getWonderVerseCollectionAddress = (chainId: ChainId) => {
    return contractAddresses.wonderVerseCollection[chainId]
}

export const getFactoryAddress = (chainId: ChainId) => {
    return contractAddresses.factory[chainId]
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

export const getWndrSushiAddress = (chainId: ChainId) => {
    return lpAddresses.wndr_sushi[chainId]
}