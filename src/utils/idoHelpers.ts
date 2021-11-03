import { ChainId } from "../config";
import { IdoConfig } from "../config/types";

export const getMainTokenSymbol = (ido: IdoConfig, chainId: ChainId) => {
    return ido.mainToken[chainId]
}

export const getSalesAmount = (ido: IdoConfig, chainId: ChainId) => {
    return Number(ido.salesAmount[chainId])
}