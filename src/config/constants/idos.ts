import { IdoConfig } from "../types";
import { ChainId } from "..";
import { getTokenDecimals } from "../../utils/decimalHelpers";

const idos: IdoConfig[] = [
    {
        id: "bub",
        name: "BUB Coin",
        idoAddress: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0xE323Dc64B8fA21bc3e938245726ae2c25D537b79"
        },
        tokenDecimals: getTokenDecimals('BUB'),
        mainToken: {
            [ChainId.MAINNET]: "MATIC",
            [ChainId.TESTNET]: "ETH"
        },
        salesAmount: 5000000,
        description: "A community driven token, issued by Australia Blockchain Hub",
        projectSiteUrl: "https://chainhub.com.au",
    },
]

export default idos