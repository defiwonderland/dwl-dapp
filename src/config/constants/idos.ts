import { IdoConfig } from "../types";
import { ChainId } from "..";
import { getTokenDecimals } from "../../utils/decimalHelpers";

const idos: IdoConfig[] = [
    {
        id: "bub",
        name: "BUB Coin",
        idoAddress: {
            [ChainId.MATIC]: "",
            [ChainId.KOVAN]: "0xE323Dc64B8fA21bc3e938245726ae2c25D537b79",
            [ChainId.MATIC_TESTNET]: "0xe450C5169DdD856538c9F7aA21383096994de64c"
        },
        tokenDecimals: getTokenDecimals('BUB'),
        mainToken: {
            [ChainId.MATIC]: "MATIC",
            [ChainId.KOVAN]: "ETH",
            [ChainId.MATIC_TESTNET]: "MATIC"
        },
        salesAmount: 5000000,
        description: "A community driven token, issued by Australia Blockchain Hub",
        projectSiteUrl: "https://chainhub.com.au",
    },
]

export default idos