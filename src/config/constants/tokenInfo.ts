import { ChainId } from "..";

interface TokenInfo {
    [token: string]: {
        address: {
            [ChainId.MAINNET]: string,
            [ChainId.TESTNET]: string,
        },
        decimals: number
    }
}

const tokenInfo: TokenInfo = {
    "WNDR": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0xbf212679f4A76D1fB194aDEFa8d831Ca809B79c5"
        },
        decimals: 18
    },

    "MATIC": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0x5b67676a984807a212b1c59ebfc9b3568a474f0a"
        },
        decimals: 18
    },

    "ETH": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0x4c0D84810A3C2C07c46Fd595E05614818f3039B0"
        },
        decimals: 18
    },

    "BUB": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0xA8b228a43AE116725b545aa64eFd234e33bC78E8"
        },
        decimals: 18
    }
}

export default tokenInfo