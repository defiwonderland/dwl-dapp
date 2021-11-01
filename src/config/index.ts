import { nodes } from "../utils/getRpcUrl"

export enum ChainId {
    MAINNET = 137,
    TESTNET = 42,
}

export const BASE_POLYGON_SCAN_URLS = {
    [ChainId.MAINNET]: 'https://polygonscan.com',
    [ChainId.TESTNET]: 'https://kovan.etherscan.io',
}

export const BASE_SUSHISWAP_URL = "https://app.sushi.com"

export const HEX_CHAIN_ID = {
    [ChainId.MAINNET]: "0x89",
    [ChainId.TESTNET]: "0x2A"
}

export const CHAIN_INFO: { [chainId in ChainId]?: any } = {
    [ChainId.MAINNET]: {
        chainId: HEX_CHAIN_ID[ChainId.MAINNET],
        chainName: 'Matic(Polygon) Mainnet',
        nativeCurrency: {
            name: 'Matic(Polygon) Mainnet',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: nodes,
        blockExplorerUrls: [BASE_POLYGON_SCAN_URLS[ChainId.MAINNET]]
    }
}