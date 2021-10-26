import { useEffect } from "react"
import useAuth from "./useAuth"
import { ConnectorNames } from "../utils/web3React"
import useActiveWeb3React from "./useActiveWeb3React"

const useEagerConnect = () => {
    const { login } = useAuth()
    const { error, active } = useActiveWeb3React()

    useEffect(() => {
        const { ethereum } = window as any
        const connectorId = ConnectorNames.Injected

        if (ethereum && ethereum.on && !active && !error) {
            const handleConnect = () => {
                console.log("Handling 'connect' event")
                login(connectorId)
            }

            ethereum.on('connect', handleConnect)

            return () => {
                if (ethereum.removeListener) {
                    ethereum.removeListener('connect', handleConnect)
                }
            }
        }
    }, [login, active, error])
}

export default useEagerConnect