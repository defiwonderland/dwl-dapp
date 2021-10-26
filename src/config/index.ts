import { nodes } from "../utils/getRpcUrl"

export enum ChainId {
    MAINNET = 137,
    TESTNET = 80001,
}

export const BASE_POLYGON_SCAN_URLS = {
    [ChainId.MAINNET]: 'https://polygonscan.com',
    [ChainId.TESTNET]: 'https://mumbai.polygonscan.com',
}

export const BASE_SUSHISWAP_URL = "https://app.sushi.com"

export const HEX_CHAIN_ID = {
    [ChainId.MAINNET]: "0x89",
    [ChainId.TESTNET]: "0x13881"
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
    },
    [ChainId.TESTNET]: {
        chainId: HEX_CHAIN_ID[ChainId.TESTNET],
        chainName: 'Matic Testnet Mumbai',
        nativeCurrency: {
            name: 'Matic Testnet Mumbai',
            symbol: 'TMATIC',
            decimals: 18,
        },
        rpcUrls: nodes,
        blockExplorerUrls: [BASE_POLYGON_SCAN_URLS[ChainId.TESTNET]],
    }
}