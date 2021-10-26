import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import theme from './theme'
import { RefreshContextProvider } from './contexts/RefreshContext'

const Providers: React.FC = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <ThemeProvider theme={theme}>
                <RefreshContextProvider>
                    {children}
                </RefreshContextProvider>
            </ThemeProvider>
        </Web3ReactProvider>
    )
}

export default Providers