import { ChainId, BASE_POLYGON_SCAN_URLS } from "../config";

export const getTranscationHash = (chainId: ChainId, hash?: string,) => {
    return `${BASE_POLYGON_SCAN_URLS[chainId]}/tx/${hash}`
}

export const getAddressOnScan = (chainId: ChainId, address?: string) => {
    return `${BASE_POLYGON_SCAN_URLS[chainId]}/address/${address}`
}