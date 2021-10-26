import { useCallback } from 'react'
import { ethers } from 'ethers'
import { getBonusRewardAddress } from '../utils/addressHelpers'
import { Contract } from '@ethersproject/contracts'

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