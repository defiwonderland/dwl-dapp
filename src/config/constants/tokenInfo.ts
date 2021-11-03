import { ChainId } from ".."

interface TokenInfo {
    [token: string]: {
        address: {
            [ChainId.MATIC]: string,
            [ChainId.KOVAN]: string,
            [ChainId.MATIC_TESTNET]: string
        },
        decimals: number
    }
}

const tokenInfo: TokenInfo = {
    "WNDR": {
        address: {
            [ChainId.MATIC]: "",
            [ChainId.KOVAN]: "0xda01d1EbB5f9Bd712CC8EB8D3EFea7e0547C854f",
            [ChainId.MATIC_TESTNET]: "0xbf212679f4A76D1fB194aDEFa8d831Ca809B79c5"
        },
        decimals: 18
    },

    "MATIC": {
        address: {
            [ChainId.MATIC]: "",
            [ChainId.KOVAN]: "",
            [ChainId.MATIC_TESTNET]: "0x5b67676a984807a212b1c59ebfc9b3568a474f0a"
        },
        decimals: 18
    },

    "ETH": {
        address: {
            [ChainId.MATIC]: "",
            [ChainId.KOVAN]: "0xd0a1e359811322d97991e03f863a0c30c2cf029c",
            [ChainId.MATIC_TESTNET]: "0x4c0D84810A3C2C07c46Fd595E05614818f3039B0"
        },
        decimals: 18
    },

    "BUB": {
        address: {
            [ChainId.MATIC]: "",
            [ChainId.KOVAN]: "0x3BA3127c93248A88dfD4eeA5b27b22B796043F89",
            [ChainId.MATIC_TESTNET]: "0xA8b228a43AE116725b545aa64eFd234e33bC78E8"
        },
        decimals: 18
    }
}

export default tokenInfo