import { ChainId } from ".";

export interface Address {
    [ChainId.MAINNET]: string
    [ChainId.TESTNET]: string
}

export interface FarmConfig {
    pid: number;
    stakeToken: {
        symbol: string;
        address: string;
        decimals: number;
    };
    rewardToken: {
        symbol: string;
        address: string;
        decimals: number;
    },
}

export interface IdoConfig {
    id: string
    idoAddress: Address
    tokenDecimals: number
    mainToken: Address
    name: string
    description: string
    projectSiteUrl: string,
    salesAmount: number
}

export interface NftConfg {
    id: string,
    img: string
}

export interface FundConfig {
    fid: string
    title: string,
    subtitle: string,
    buttonText: string,
    managedValue: string,
    return: string,
    risk: string
}

export interface LeaderboardFundConfig {
    rank: number,
    score: number,
    network: string,
    pool: string,
    manager: string,
    managerImg: string,
    managedValue: string,
    oneDay: number,
    oneWeek: number,
    oneMonth: number,
    threeMonths: number,
    sixMonths: number,
    lifeTime: number,
    risk: string
}

export interface PublicPostConfig {
    pid: number
    title: string,
    img: string,
    smImg: string,
}

export interface SerializedToken {
    chainId: number
    address: string
    decimals: number
    symbol?: string
    name?: string
    projectLink?: string
}

