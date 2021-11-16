import { useCallback, useEffect, useState } from 'react'
import { Currency, CurrencyAmount, JSBI, ChainId } from '@sushiswap/sdk'
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'
import { AppDispatch, AppState } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { parseUnits } from '@ethersproject/units'

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

// try to parse a user entered amount for a given token
export function tryParseAmount<T extends Currency>(value?: string, currency?: T): CurrencyAmount<T> | undefined {
    if (!value || !currency) {
        return undefined
    }
    try {
        const typedValueParsed = parseUnits(value, currency.decimals).toString()
        if (typedValueParsed !== '0') {
            return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed))
        }
    } catch (error) {
        // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
        console.debug(`Failed to parse input amount: "${value}"`, error)
    }
    // necessary for all paths to return a value
    return undefined
}