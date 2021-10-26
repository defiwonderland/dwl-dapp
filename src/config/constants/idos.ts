import { IdoConfig } from "../types";
import { ChainId } from "..";
import { getTokenDecimals } from "../../utils/decimalHelpers";

const idos: IdoConfig[] = [
    {
        id: "bub",
        name: "BUB Coin",
        idoAddress: {
            [ChainId.MAINNET]: "",
            [ChainId.TESTNET]: "0xe450C5169DdD856538c9F7aA21383096994de64c"
        },
        tokenDecimals: getTokenDecimals('BUB'),
        mainToken: "MATIC",
        salesAmount: 1000000,
        description: "A community driven token, issued by Australia Blockchain Hub",
        projectSiteUrl: "https://chainhub.com.au",
    },
]

export default idos