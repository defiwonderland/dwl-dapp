import { City } from "../../../config/types";

export interface WonderVerseBaseInfo {
    basePrice: number
    minimumTokenAmount: number
}

export interface CityInfo extends City {
    desc?: string
    isBid?: boolean,
    owner?: string,
    ipfsHash?: string,
    bidLevel?: number
    twitter?: string
}

export interface PinsProps {
    cities: CityInfo[],
    onClick: React.Dispatch<React.SetStateAction<any>>,
    zoom: number
}

export interface PostOrBidProps {
    info: CityInfo
    setPopupInfo: (params: any) => void
    baseInfo?: WonderVerseBaseInfo
    tokenBalance?: number
    allowance?: number
}

export interface FormProps extends PostOrBidProps {
    setShowForm: (params: boolean) => void
}