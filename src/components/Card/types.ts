import { FarmConfig, IdoConfig, FundConfig } from "../../config/types";


interface Trait {
    attributes: Attribute[];
    image: string;
    description: string;
    name: string;
    id?: string;
}

interface Attribute {
    trait_type: string;
    value: string;
}

export interface StatsCardProps {
    stats: string,
    desc: string,
    img: string,
    color: string
}

export interface Farm extends FarmConfig {
    rewards?: number,
    stakeTokenNumber?: number,
    farmEarnings?: {
        apr: string
        isFarmEnded: boolean
        isRemBonusEnough: boolean
        tvl: string
    }
}

export interface Pool extends FarmConfig {
    rewards?: number,
    stakeTokenNumber?: number,
    poolEarnings?: {
        apr: string
        isFarmEnded: boolean
        isRemBonusEnough: boolean
        tvl: string
        endTime: number
        totalStakeTokenNumber: number
    }
}

export interface NftCardProps {
    collection: Trait
}

export interface FundCardProps {
    direction: boolean
    fund: FundConfig
}

export interface Ido extends IdoConfig {
    closingTime?: number,
    openingTime?: number,
    rate?: number,
    hasClosed?: boolean,
    isOpen?: boolean,
    remainingTokens?: number
}

export interface VoteCardProps {
    series: number[],
    title: string,
    totalVote: string,
    addressVolume: string
}

export interface DirectionIconCardProps {
    isup: boolean
    text: string
}

export interface PopoverSettingProps {
    open: boolean
    onClose: () => void
}