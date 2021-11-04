import { nodes } from "../utils/getRpcUrl"

export enum ChainId {
    MATIC = 137,
    MATIC_TESTNET = 80001,
    KOVAN = 42
}

export const BASE_SCAN_URLS = {
    [ChainId.MATIC]: 'https://polygonscan.com',
    [ChainId.KOVAN]: 'https://kovan.etherscan.io',
    [ChainId.MATIC_TESTNET]: 'https://mumbai.polygonscan.com',
}

export const NETWORK_NAME = {
    [ChainId.MATIC]: 'Polygon',
    [ChainId.KOVAN]: 'Ethereum',
    [ChainId.MATIC_TESTNET]: 'Polygon',
}

export const NETWORK_MAIN_TOKEN = {
    [ChainId.MATIC]: 'MATIC',
    [ChainId.KOVAN]: 'ETH',
    [ChainId.MATIC_TESTNET]: 'MATIC',
}

export const BASE_SUSHISWAP_URL = "https://app.sushi.com"

export const HEX_CHAIN_ID = {
    [ChainId.MATIC]: "0x89",
    [ChainId.KOVAN]: "0x2A",
    [ChainId.MATIC_TESTNET]: "0x13881"
}

export const CHAIN_INFO: { [chainId in ChainId]?: any } = {
    [ChainId.MATIC]: {
        chainId: HEX_CHAIN_ID[ChainId.MATIC],
        chainName: 'Matic(Polygon) Mainnet',
        nativeCurrency: {
            name: 'Matic(Polygon) Mainnet',
            symbol: 'MATIC',
            decimals: 18,
        },
        rpcUrls: nodes,
        blockExplorerUrls: [BASE_SCAN_URLS[ChainId.MATIC]]
    },
    [ChainId.MATIC_TESTNET]: {
        chainId: HEX_CHAIN_ID[ChainId.MATIC_TESTNET],
        chainName: 'Matic Testnet Mumbai',
        nativeCurrency: {
            name: 'Matic Testnet Mumbai',
            symbol: 'TMATIC',
            decimals: 18,
        },
        rpcUrls: nodes,
        blockExplorerUrls: [BASE_SCAN_URLS[ChainId.MATIC]],
    }

}