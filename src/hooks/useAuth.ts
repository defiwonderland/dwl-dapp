import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { setupNetwork } from '../utils/wallet'
import { connectorsByName, ConnectorNames } from '../utils/web3React'

const useAuth = () => {
    const { activate, deactivate } = useWeb3React()
    const chainId = Number(process.env.REACT_APP_CHAIN_ID)

    const login = useCallback(
        (connectorID: ConnectorNames) => {
            const connector = connectorsByName[connectorID]
            if (connector) {
                activate(connector, async (error: Error) => {
                    if (error instanceof UnsupportedChainIdError) {
                        try {
                            const hasSetup = await setupNetwork(chainId)
                            if (hasSetup) {
                                activate(connector)
                            }
                        } catch (e: any) {
                            console.error("Failed to switch network", e.message)
                        }
                    } else {
                        if (error instanceof NoEthereumProviderError) {
                            alert('No provider was found. Please install metamask first')
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected
                        ) {
                            alert('Please authorize to access your account')
                        } else {
                            console.error(error.message)
                        }
                    }
                })
            } else {
                console.error('Unable to find connector,the connector config is wrong')
            }
        },
        [activate, chainId]
    )

    const logout = useCallback(() => {
        deactivate()
    }, [deactivate])

    return { login, logout }
}

export default useAuth
