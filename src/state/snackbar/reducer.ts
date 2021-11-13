import { createReducer } from '@reduxjs/toolkit'
import {
    updateErrorState,
    updateSuccessState,
    updateLoadingState,
    updateTransactionHash,
    updateSnackbarState
} from './actions'

const initialState = {
    openSnackbar: false,
    loading: false,
    loadingMessage: "",
    success: false,
    successMessage: "",
    error: false,
    errorMessage: "",
    transactionHash: ""
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(updateSnackbarState, (state, action) => {
            state.openSnackbar = action.payload.openSnackbar
        })
        .addCase(updateLoadingState, (state, action) => {
            state.loading = action.payload.loading
            state.loadingMessage = action.payload.loadingMessage
        })
        .addCase(updateSuccessState, (state, action) => {
            state.success = action.payload.success
            state.successMessage = action.payload.successMessage
        })
        .addCase(updateErrorState, (state, action) => {
            state.error = action.payload.error
            state.errorMessage = action.payload.errorMessage
        })
        .addCase(updateTransactionHash, (state, action) => {
            state.transactionHash = action.payload.transactionHash
        })
)