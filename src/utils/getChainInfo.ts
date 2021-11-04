import { ChainId } from "../config";
import { BASE_SCAN_URLS, NETWORK_MAIN_TOKEN, NETWORK_NAME } from "../config";

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