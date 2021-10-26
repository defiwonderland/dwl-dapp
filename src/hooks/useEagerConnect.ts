import { useEffect } from "react"
import useAuth from "./useAuth"
import { ConnectorNames } from "../utils/web3React"
import useActiveWeb3React from "./useActiveWeb3React"
import { UnsupportedChainIdError } from "@web3-react/core"

const useEagerConnect = () => {
    const { login, logout } = useAuth()
    const { error, active } = useActiveWeb3React()

    useEffect(() => {
        const { ethereum } = window as any
        const connectorId = ConnectorNames.Injected

        if (ethereum && ethereum.on && !active) {
            const handleConnect = () => {
                console.log("Handling 'connect' event")
                login(connectorId)
            }

            const handleChainChanged = (chainId: string | number) => {
                console.log("Handling 'chainChanged' event with payload", chainId)
                login(connectorId)
            }
            const handleAccountsChanged = (accounts: string[]) => {
                console.log("Handling 'accountsChanged' event with payload", accounts)
                if (accounts.length > 0) {
                    login(connectorId)
                }
            }
            const handleNetworkChanged = (networkId: string | number) => {
                console.log("Handling 'networkChanged' event with payload", networkId)

                if (error instanceof UnsupportedChainIdError) {
                    logout()
                } else {
                    login(connectorId)
                }
            }

            ethereum.on('connect', handleConnect)
            ethereum.on('chainChanged', handleChainChanged)
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.on('networkChanged', handleNetworkChanged)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                    ethereum.removeListener('chainChanged', handleChainChanged)
                    ethereum.removeListener('accountsChanged', handleAccountsChanged)
                    ethereum.removeListener('networkChanged', handleNetworkChanged)
                }
            }
        }
    }, [login, logout, error, active])
}

export default useEagerConnect