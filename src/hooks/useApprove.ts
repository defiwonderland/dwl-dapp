import { useCallback } from 'react'
import { ethers } from 'ethers'
import { getBonusRewardAddress } from '../utils/addressHelpers'
import { getTokenAddress } from '../utils/addressHelpers'
import { Contract } from '@ethersproject/contracts'
import { useERC20 } from './useContract'

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const useBonusRewardApprove = (lpContract: Contract) => {
    const onApprove = useCallback(async () => {
        try {
            const tx = await lpContract.approve(getBonusRewardAddress(chainId), ethers.constants.MaxUint256)
            return tx
        } catch {
            return false
        }
    }, [lpContract])

    return { onApprove }
}

export const useWndrApprove = (contractAddress: string) => {
    const wndrContract = useERC20(getTokenAddress("WNDR", chainId)) as Contract

    const onApprove = useCallback(async () => {
        try {
            const tx = await wndrContract.approve(contractAddress, ethers.constants.MaxUint256)
            return tx
        } catch {
            return false
        }
    }, [wndrContract, contractAddress])

    return { onApprove }
}