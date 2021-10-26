import { ethers } from 'ethers'
import getNodeUrl from './getRpcUrl'

export const RPC_URL = getNodeUrl() as string

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)