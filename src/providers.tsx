import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import theme from './theme'
import { RefreshContextProvider } from './contexts/RefreshContext'
import { Provider } from 'react-redux'
import store from './state'

const Providers: React.FC = ({ children }) => {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <RefreshContextProvider>
                        {children}
                    </RefreshContextProvider>
                </ThemeProvider>
            </Provider>
        </Web3ReactProvider>
    )
}

export default Providers