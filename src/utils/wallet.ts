import { ChainId, CHAIN_INFO } from "../config";

export const setupNetwork = async (chainId: ChainId) => {
    const { ethereum } = window as any
    const provider = ethereum
    if (provider) {
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [CHAIN_INFO[chainId]]
            })
            return true
        } catch (error) {
            console.error('Failed to setup the network in Metamask:', error)
            return false
        }
    } else {
        console.error("Can't setup the POLYGON network on metamask because window.ethereum is undefined")
        return false
    }
}