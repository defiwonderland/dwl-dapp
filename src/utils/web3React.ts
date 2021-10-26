import { InjectedConnector } from '@web3-react/injected-connector'
import { ethers } from 'ethers'

const POLLING_INTERVAL = 12000
const chainId = Number(process.env.REACT_APP_CHAIN_ID)

export const injected = new InjectedConnector({ supportedChainIds: [chainId] })

export enum ConnectorNames {
    Injected = 'Injected',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
    [ConnectorNames.Injected]: injected,
}

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = POLLING_INTERVAL
    return library
}