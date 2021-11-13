import { createAction } from '@reduxjs/toolkit'

export const updateSnackbarState = createAction<{ openSnackbar: boolean }>('snackbar/updateSnackbarState')
export const updateLoadingState = createAction<{ loading: boolean, loadingMessage: string }>('snackbar/updateLoadingState')
export const updateSuccessState = createAction<{ success: boolean, successMessage: string }>('snackbar/updateSuccessState')
export const updateErrorState = createAction<{ error: boolean, errorMessage: string }>('snackbar/updateErrorState')
export const updateTransactionHash = createAction<{ transactionHash: string }>('snackbar/updateTransactionHash')