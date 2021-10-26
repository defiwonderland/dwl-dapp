import axios from "axios"
import { tokenMapping } from "../config/constants/valueMapping"
import { ethers } from "ethers";
import priceFeedABI from "../config/abi/priceFeed.json"
import { getPriceFeedAddress } from "./addressHelpers";
import { getWndrMaticAddress, getTokenAddress } from "./addressHelpers";
import { simpleRpcProvider } from "./providers";
import { getBalanceNumber } from "./formatBalance";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const url = "https://api.coingecko.com/api/v3/simple/price"

interface TokenPrice {
    [key: string]: {
        [currency: string]: any
    }
}

export const fetchPrice = async () => {
    const tokenString = Object.keys(tokenMapping).join(",")
    const { data } = await axios.get<TokenPrice>(url, {
        params: {
            ids: tokenString,
            vs_currencies: "usd"
        }
    })

    let results: { [key: string]: number } = {}

    Object.keys(tokenMapping).forEach(item => {
        results[tokenMapping[item]] = data[item].usd
    })

    return results
}

export const fetchWndrPrice = async () => {
    try {
        const priceFeed = new ethers.Contract(getPriceFeedAddress(chainId), priceFeedABI, simpleRpcProvider)
        const result = await priceFeed.getLPTotalValue(getWndrMaticAddress(chainId))
        const token1 = result[0][0]
        const tokenAmount1 = getBalanceNumber(result[1][0]._hex)
        const tokenAmount2 = getBalanceNumber(result[1][1]._hex)
        if (token1 === getTokenAddress("WNDR", chainId)) {
            return tokenAmount1 / tokenAmount2
        } else {
            return tokenAmount2 / tokenAmount1
        }
    } catch (error) {
        console.error("Failled to get wndr price", error)
    }
}