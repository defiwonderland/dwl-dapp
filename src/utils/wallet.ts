import { ChainId, CHAIN_INFO, HEX_CHAIN_ID } from "../config";

export const setupNetwork = async (chainId: ChainId) => {
    const { ethereum } = window as any
    const provider = ethereum
    if (provider) {
        try {
            if ([1, 3, 4, 5, 42].includes(chainId)) {
                await provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: HEX_CHAIN_ID[chainId] }],
                });
            } else {
                await provider.request({
                    method: 'wallet_addEthereumChain',
                    params: [CHAIN_INFO[chainId]]
                })
            }

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