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
            [ChainId.TESTNET]: "0xda01d1EbB5f9Bd712CC8EB8D3EFea7e0547C854f"
        },
        decimals: 18
    },

    "MATIC": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: ""
        },
        decimals: 18
    },

    "ETH": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0xd0a1e359811322d97991e03f863a0c30c2cf029c"
        },
        decimals: 18
    },

    "BUB": {
        address: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0x3BA3127c93248A88dfD4eeA5b27b22B796043F89"
        },
        decimals: 18
    }
}

export default tokenInfo