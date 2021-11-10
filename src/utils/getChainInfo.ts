import { ChainId } from "../config";
import { BASE_SCAN_URLS, NETWORK_MAIN_TOKEN, NETWORK_NAME, BASE_SUSHISWAP_URL } from "../config";
import { getTokenAddress } from "./addressHelpers";

export const getTranscationHash = (chainId: ChainId, hash?: string) => {
    return `${BASE_SCAN_URLS[chainId]}/tx/${hash}`
}

export const getAddressOnScan = (chainId: ChainId, address?: string) => {
    return `${BASE_SCAN_URLS[chainId]}/address/${address}`
}

export const getNetworkInfo = (chainId: ChainId) => {
    return {
        networkName: NETWORK_NAME[chainId],
        mainToken: NETWORK_MAIN_TOKEN[chainId],
    }
}

export const getSlpUrl = (chainId: ChainId, lp: string) => {
    const token1 = lp.split("-")[0]
    const token2 = lp.split('-')[1]
    const mainToken = NETWORK_MAIN_TOKEN[chainId]

    if (token1 === mainToken) {
        return `${BASE_SUSHISWAP_URL}/add/ETH/${getTokenAddress(token2, chainId)}`
    } else if (token2 === mainToken) {
        return `${BASE_SUSHISWAP_URL}/add/ETH/${getTokenAddress(token1, chainId)}`
    } else {
        return `${BASE_SUSHISWAP_URL}/add/${getTokenAddress(token1, chainId)}/${getTokenAddress(token2, chainId)}`
    }
}