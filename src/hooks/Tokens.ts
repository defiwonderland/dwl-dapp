import { getTokenAddress } from "../utils/addressHelpers";
import { Token, ChainId } from "@sushiswap/sdk"
import { Tags, TokenInfo, TokenList } from '@uniswap/token-lists'
import useActiveWeb3React from './useActiveWeb3React';
import { useMemo } from 'react'
const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const WNDR_ADDR = getTokenAddress('WNDR', chainId)

type TagDetails = Tags[keyof Tags]

export interface TagInfo extends TagDetails {
    id: string
}

const tokenList = {
    "name": "Wonderland Default List",
    "timestamp": "2021-05-06T00:00:00Z",
    "version": {
        "major": 3,
        "minor": 0,
        "patch": 0
    },
    "tags": {},
    "logoURI": "https://pancakeswap.finance/logo.png",
    "keywords": ["pancake", "default"],
    "tokens": [
        {
            "name": "kovan.wndr",
            "symbol": "WNDR",
            "address": WNDR_ADDR,
            "chainId": 42,
            "decimals": 18,
            "logoURI": "https://pancakeswap.finance/images/tokens/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png"
        }
    ]
}


export class WrappedTokenInfo extends Token {
    public readonly tokenInfo: TokenInfo

    public readonly tags: TagInfo[]

    constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
        super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
        this.tokenInfo = tokenInfo
        this.tags = tags
    }

    public get logoURI(): string | undefined {
        return this.tokenInfo.logoURI
    }
}

export type TokenAddressMap = Readonly<
    { [chainId in ChainId]: Readonly<{ [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList } }> }
>

const EMPTY_LIST: any = {
    [ChainId.KOVAN]: {},
}

export function listToTokenMap(): TokenAddressMap {
    const list = tokenList as TokenList
    const map = list.tokens.reduce<TokenAddressMap>(
        (tokenMap, tokenInfo) => {
            const tags: TagInfo[] =
                tokenInfo.tags
                    ?.map((tagId) => {
                        if (!list.tags?.[tagId]) return undefined
                        return { ...list.tags[tagId], id: tagId }
                    })
                    ?.filter((x): x is TagInfo => Boolean(x)) ?? []
            const token = new WrappedTokenInfo(tokenInfo, tags)
            if (tokenMap[token.chainId][token.address] !== undefined) throw Error('Duplicate tokens.')
            return {
                ...tokenMap,
                [token.chainId]: {
                    ...tokenMap[token.chainId],
                    [token.address]: {
                        token,
                        list,
                    },
                },
            }
        },
        { ...EMPTY_LIST },
    )

    return map
}

export function useTokensFromMap(tokenMap: TokenAddressMap): { [address: string]: Token } {
    const { chainId } = useActiveWeb3React()


    return useMemo(() => {
        if (!chainId) return {}

        // reduce to just tokens
        const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{ [address: string]: Token }>((newMap, address) => {
            newMap[address] = tokenMap[chainId][address].token
            return newMap
        }, {})

        return mapWithoutUrls
    }, [chainId, tokenMap])
}


export function useAllTokens(): { [address: string]: Token } {
    const tokenMap: TokenAddressMap = listToTokenMap()
    const allTokens: { [address: string]: Token } = useTokensFromMap(tokenMap)
    return allTokens
}