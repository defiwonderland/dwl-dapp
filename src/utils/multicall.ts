import { ethers } from 'ethers'
import MultiCallAbi from '../config/abi/multicall.json'
import { getMulticallAddress } from './addressHelpers'
import { simpleRpcProvider } from './providers'

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

interface Call {
    address: string // Address of the contract
    name: string // Function name on the contract (example: balanceOf)
    params?: any[] // Function params
}

export const multicall = async (abi: any[], calls: Call[]) => {
    const multi = new ethers.Contract(getMulticallAddress(chainId), MultiCallAbi, simpleRpcProvider)
    const itf = new ethers.utils.Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const { returnData } = await multi.aggregate(calldata)
    const res = returnData.map((call: any, i: any) => itf.decodeFunctionResult(calls[i].name, call))

    return res
}

export default multicall