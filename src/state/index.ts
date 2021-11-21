import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import snackbarReducer from "./snackbar/reducer"
import swapReducer from './swap/reducer'
import { useDispatch } from 'react-redux'
import multicallReducer from './multicall/reducer'
import userReduer from "./user/reducer"
import transactionsReducer from "./transactions/reducer"
import blockReducer from './block'

const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        swap: swapReducer,
        multicall: multicallReducer,
        block: blockReducer,
        user: userReduer,
        transactions: transactionsReducer
    },
    middleware: [...getDefaultMiddleware({ thunk: true })]
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()

export default store
