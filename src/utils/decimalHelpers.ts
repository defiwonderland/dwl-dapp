import tokenInfo from "../config/constants/tokenInfo";

// get token decimals
export const getTokenDecimals = (token: string) => {
    return tokenInfo[token.toUpperCase()].decimals
}