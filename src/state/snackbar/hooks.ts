import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import {
    updateLoadingState,
    updateSuccessState,
    updateErrorState,
    updateTransactionHash,
    updateSnackbarState
} from './actions'

type loadingState = {
    loading: boolean,
    loadingMessage: string
}

type successState = {
    success: boolean,
    successMessage: string
}

type errorState = {
    error: boolean,
    errorMessage: string
}

export function useSnackbarState(): [boolean, (openSnackbar: boolean) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const openSnackbar = useSelector<AppState, AppState['snackbar']['openSnackbar']>((state) => {
        return state.snackbar.openSnackbar
    })

    const setOpenSnackbar = useCallback((openSnackbar: boolean) => {
        dispatch(updateSnackbarState({ openSnackbar: openSnackbar }))
    }, [dispatch])

    return [openSnackbar, setOpenSnackbar]
}

export function useLoadingState(): [loadingState, (loadingState: loadingState) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const loading = useSelector<AppState, AppState['snackbar']['loading']>((state) => {
        return state.snackbar.loading
    })

    const loadingMessage = useSelector<AppState, AppState['snackbar']['loadingMessage']>((state) => {
        return state.snackbar.loadingMessage
    })

    const setLoadingState = useCallback((loadingState: loadingState) => {
        dispatch(updateLoadingState({ loading: loadingState.loading, loadingMessage: loadingState.loadingMessage }))
    }, [dispatch])

    return [{ loading, loadingMessage }, setLoadingState]
}


export function useSuccessState(): [successState, (successState: successState) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const success = useSelector<AppState, AppState['snackbar']['success']>((state) => {
        return state.snackbar.success
    })

    const successMessage = useSelector<AppState, AppState['snackbar']['successMessage']>((state) => {
        return state.snackbar.successMessage
    })

    const setSuccessState = useCallback((successState: successState) => {
        dispatch(updateSuccessState({ success: successState.success, successMessage: successState.successMessage }))
    }, [dispatch])

    return [{ success, successMessage }, setSuccessState]
}


export function useErrorState(): [errorState, (errorState: errorState) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const error = useSelector<AppState, AppState['snackbar']['error']>((state) => {
        return state.snackbar.error
    })

    const errorMessage = useSelector<AppState, AppState['snackbar']['errorMessage']>((state) => {
        return state.snackbar.errorMessage
    })

    const setErrorState = useCallback((errorState: errorState) => {
        dispatch(updateErrorState({ error: errorState.error, errorMessage: errorState.errorMessage }))
    }, [dispatch])

    return [{ error, errorMessage }, setErrorState]
}

export function useTransactionHash(): [string, (transacionHash: string) => void] {
    const dispatch = useDispatch<AppDispatch>()

    const transactionHash = useSelector<AppState, AppState['snackbar']['transactionHash']>((state) => {
        return state.snackbar.transactionHash
    })

    const setTransactionHash = useCallback((transacionHash: string) => {
        dispatch(updateTransactionHash({ transactionHash: transacionHash }))
    }, [dispatch])

    return [transactionHash, setTransactionHash]
}