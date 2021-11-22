import { useCallback } from 'react'
import { Currency } from '@sushiswap/sdk'
import { Field, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'
import { AppDispatch, AppState } from '../index'
import { useDispatch, useSelector } from 'react-redux'

export function useSwapState(): AppState['swap'] {
    return useSelector<AppState, AppState['swap']>((state) => state.swap)
}

export function useSwapActionHandlers(): {
    onCurrencySelection: (field: Field, currency: Currency) => void
    onSwitchTokens: () => void
    onUserInput: (field: Field, typedValue: string) => void
    onChangeRecipient: (recipient: string | null) => void
} {
    const dispatch = useDispatch<AppDispatch>()
    const onCurrencySelection = useCallback(
        (field: Field, currency: Currency) => {
            dispatch(
                selectCurrency({
                    field,
                    currencyId: currency.isToken
                        ? currency.address
                        : currency.isNative
                            ? 'ETH'
                            : '',
                })
            )
        },
        [dispatch]
    )

    const onSwitchTokens = useCallback(() => {
        dispatch(switchCurrencies())
    }, [dispatch])

    const onUserInput = useCallback(
        (field: Field, typedValue: string) => {
            dispatch(typeInput({ field, typedValue }))
        },
        [dispatch]
    )

    const onChangeRecipient = useCallback(
        (recipient: string | null) => {
            dispatch(setRecipient({ recipient }))
        },
        [dispatch]
    )

    return {
        onSwitchTokens,
        onCurrencySelection,
        onUserInput,
        onChangeRecipient,
    }
}