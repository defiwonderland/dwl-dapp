export interface SnackbarProps {
    open: boolean,
    onClose: () => void
    loading?: boolean,
    loadingMessage?: string,
    success?: boolean,
    successMessage?: string,
    error?: boolean,
    errorMessage?: string,
    transactionHash?: string
}