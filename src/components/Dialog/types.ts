export interface StakeDialogProps {
    title: string,
    desc: string,
    buttonText: string,
    isDeposit: boolean
    open: boolean,
    handleClose: () => void,
    stakeTokenSymbol?: string,
    stakeTokenNumber?: number,
    stakeTokenAddress?: string,
    stakeTokenDecimal?: number,
    walletTokenNumber?: number
    setStakeTokenNumber: React.Dispatch<React.SetStateAction<number | undefined>>
}

export interface IdoDialogProps {
    name: string
    account?: string | null
    title: string,
    desc: string,
    open: boolean,
    handleClose: () => void,
    mainToken: string,
    walletTokenNumber: number,
    idoAddress: string,
    rate?: number
}

export interface ConnectDialogProps {
    open: boolean,
    handleClose: () => void,
}


export interface AccountDialogProps {
    open: boolean,
    handleClose: () => void,
    account?: string | null,
    balance: number
    networkName: string,
    mainToken: string,
}