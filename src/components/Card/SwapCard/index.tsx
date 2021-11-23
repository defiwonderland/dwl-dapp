import React, { useCallback, useMemo } from "react"
import { StyledCard, CardText } from "../elements";
import { StyledH3 } from "../../Text";
import { Box } from "@mui/system";
import { Percent } from '@sushiswap/sdk'
import { StyledIconButton, PrimaryButton } from "../../Button";
import { FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { FiSettings } from "react-icons/fi"
import { StyledBox, InputContainer, TradeInput } from "./elements";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { CustomImg } from "../elements";
import UnlockButton from "../../UnlockButton";
import { useDerivedSwapInfo } from "./hooks"
import { useSwapCallback } from "../../../hooks/useSwapCallback";
import { Field } from "../../../state/swap/actions";
import { useSwapState, useSwapActionHandlers } from "../../../state/swap/hooks";
import { HiSwitchVertical } from "react-icons/hi"
import { getTokenAddress } from "../../../utils/addressHelpers";
import { useCurrency } from "./hooks";
import Skeleton from '@mui/material/Skeleton';
import {
    useSnackbarState,
    useLoadingState,
    useErrorState,
    useTransactionHash,
    useSuccessState
} from "../../../state/snackbar/hooks"
import CustomSnackbar from "../../Snackbar";
import { ApprovalState, useApproveCallbackFromTrade } from "../../../hooks/useApprove";
import PopoverList from "../../Popover";
import { componentElement } from "../../Popover";
import { TextField } from "@mui/material";
import { useSetUserSlippageTolerance, useUserTransactionTTL } from "../../../state/user/hooks";
import { DEFAULT_DEADLINE_FROM_NOW } from "../../../config/constants";

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const SwapCard: React.FC = () => {
    const { account } = useActiveWeb3React()
    const { independentField, typedValue } = useSwapState()
    const { onUserInput, onCurrencySelection } = useSwapActionHandlers()
    const [openSnackbar, setOpenSnackbar] = useSnackbarState()
    const ETH = useCurrency("ETH")
    const WNDR = useCurrency(getTokenAddress('WNDR', chainId))
    const [loadingState, setLoadingState] = useLoadingState()
    const [successState, setSuccessState] = useSuccessState()
    const [errorState, setErrorState] = useErrorState()
    const [transactionHash, setTransactionHash] = useTransactionHash()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [validSlippage, setValidSlippage] = React.useState<boolean>(true)
    const [warningSlippage, setWarningSlippage] = React.useState<boolean>(false)
    const [deadline, setDeadline] = useUserTransactionTTL()
    const [validDeadline, setValidDeadline] = React.useState<boolean>(true)
    const setUserSlippageTolerance = useSetUserSlippageTolerance()

    const parseSlippageInput = (event: any) => {
        const value = event.target.value
        setValidSlippage(true)
        setWarningSlippage(false)
        const parsed = Math.floor(Number.parseFloat(value) * 100)
        if (!Number.isInteger(parsed) || parsed < 0 || parsed >= 5000) {
            setValidSlippage(false)
            setUserSlippageTolerance('auto')
        } else {
            if (parsed >= 1000 && parsed < 5000) {
                setWarningSlippage(true)
            } else {
                setWarningSlippage(false)
            }
            setUserSlippageTolerance(new Percent(parsed, 10_000))
            setValidSlippage(true)
        }
    }

    const parseCustomDeadline = (event: any) => {
        const value = event.target.value
        setValidDeadline(true)

        const parsed: number = Math.floor(Number.parseFloat(value) * 60)

        if (!Number.isInteger(parsed) || parsed < 60 || parsed > 180 * 60) {
            setValidDeadline(false)
            setDeadline(DEFAULT_DEADLINE_FROM_NOW)
        } else {
            setDeadline(parsed)
        }
    }

    const comp1 = <Box>
        <CardText mt="0px" mb="5px" fontWeight={400}>Slippage Tolerance:</CardText>
        <Box sx={{ width: "200px" }}>
            <TextField
                size="small"
                placeholder={"0.5"}
                error={!validSlippage}
                color={warningSlippage ? "warning" : "primary"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                    ),
                }}
                onChange={(event) => parseSlippageInput(event)}
            />

            {!validSlippage && <FormHelperText id="component-error-text" sx={{ color: "#dc3545" }}>Please enter a valid percentage</FormHelperText>}
            {warningSlippage && <FormHelperText id="component-error-text" sx={{ color: "#ffc107" }}>Your transaction may be frontrun</FormHelperText>}
        </Box>
    </Box>

    const comp2 = <Box>
        <CardText mt="0px" mb="5px" fontWeight={400}>Transaction Deadline:</CardText>
        <Box sx={{ width: "200px" }}>
            <TextField
                size="small"
                placeholder={String(deadline / 60)}
                error={!validDeadline}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">min</InputAdornment>
                    ),
                }}
                onChange={(event) => parseCustomDeadline(event)}
            />

            {!validDeadline && <FormHelperText id="component-error-text" sx={{ color: "#dc3545" }}>Please enter a valid deadline</FormHelperText>}
        </Box>
    </Box>


    const componentArray: componentElement[] = [
        {
            id: "1",
            content: comp1
        },
        {
            id: "2",
            content: comp2
        }
    ]

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const popoverButtonComponent = <StyledIconButton bgcolor="#0b2d28" onClick={handlePopoverClick}>
        <FiSettings />
    </StyledIconButton>

    const handleTypeInput = useCallback(
        (value: string) => {
            onUserInput(Field.INPUT, value)
        },
        [onUserInput]
    )

    const handleTypeOutput = useCallback(
        (value: string) => {
            onUserInput(Field.OUTPUT, value)
        },
        [onUserInput]
    )

    const handleInputSelect = useCallback(
        (inputCurrency) => {
            onCurrencySelection(Field.INPUT, inputCurrency)
        },
        [onCurrencySelection]
    )

    const handleOutputSelect = useCallback(
        (outputCurrency) => onCurrencySelection(Field.OUTPUT, outputCurrency),
        [onCurrencySelection]
    )

    const doArcher: any = undefined
    const {
        v2Trade,
        currencyBalances,
        parsedAmount,
        currencies,
        inputError: swapInputError,
        allowedSlippage,
    } = useDerivedSwapInfo(doArcher)

    const inputCurrency = currencies[Field.INPUT].symbol
    const outputCurrency = currencies[Field.OUTPUT].symbol
    const inputBalance = currencyBalances[Field.INPUT]?.toSignificant(6) ?? 0
    const outputBalance = currencyBalances[Field.OUTPUT]?.toSignificant(6) ?? 0

    // the callback to execute the swap
    const trade = v2Trade
    const signatureData: any = undefined
    const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

    // check whether the user has approved the router on the input token
    const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage, doArcher)

    const showApprove = !swapInputError &&
        (approvalState === ApprovalState.NOT_APPROVED ||
            approvalState === ApprovalState.PENDING)

    const handleApprove = useCallback(async () => {
        await approveCallback()
    }, [approveCallback])

    const parsedAmounts = useMemo(() => {
        return {
            [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
            [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
        }
    }, [independentField, parsedAmount, trade])

    const formattedAmounts = useMemo(() => (
        {
            [independentField]: typedValue,
            [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
        }
    ), [independentField, dependentField, parsedAmounts, typedValue])

    const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
        trade,
        allowedSlippage,
        account,
        signatureData,
        doArcher
    )

    const isInputValid = parseFloat(formattedAmounts[Field.OUTPUT]) > 0 || parseFloat(formattedAmounts[Field.OUTPUT]) > 0

    const handleSwitch = useCallback(() => {
        if (inputCurrency.toLocaleLowerCase() === "eth") {
            handleInputSelect(WNDR)
            handleOutputSelect(ETH)
        } else {
            handleInputSelect(ETH)
            handleOutputSelect(WNDR)
        }

        handleTypeInput(formattedAmounts[Field.OUTPUT])
    }, [handleInputSelect, inputCurrency, handleTypeInput, formattedAmounts, ETH, WNDR, handleOutputSelect])

    const handleSwap = useCallback(() => {
        if (!swapCallback) {
            return
        }

        setLoadingState({ loading: true, loadingMessage: `Swapping ${inputCurrency} to ${outputCurrency}...` })
        setSuccessState({ success: false, successMessage: "" })
        setErrorState({ error: false, errorMessage: "" })
        setOpenSnackbar(true)
        setTransactionHash("")

        swapCallback()
            .then((hash) => {
                handleTypeInput("")
                handleTypeOutput("")
                setLoadingState({ loading: false, loadingMessage: "" })
                setSuccessState({ success: true, successMessage: `Swapped ${formattedAmounts[Field.INPUT]} ${inputCurrency} to ${formattedAmounts[Field.OUTPUT]} ${outputCurrency}...` })
                setOpenSnackbar(true)
                setTransactionHash(hash)
            }).catch((error) => {
                setLoadingState({ loading: false, loadingMessage: "" })
                setErrorState({ error: true, errorMessage: `Oops! Failed to swap ${inputCurrency} to ${outputCurrency}. Please try again!` })
                setOpenSnackbar(true)
            })
    }, [swapCallback, handleTypeInput, handleTypeOutput, inputCurrency, outputCurrency, formattedAmounts, setErrorState, setLoadingState, setOpenSnackbar, setSuccessState, setTransactionHash])

    return (
        <>
            <StyledBox>
                <StyledCard bgcolor="#000000">
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                    }}>
                        <StyledH3 style={{ color: "#ffffff" }}>Swap</StyledH3>

                        <PopoverList
                            header="Transaction Settings"
                            buttonComponent={popoverButtonComponent}
                            anchorEl={anchorEl}
                            onClose={() => setAnchorEl(null)}
                            componentArray={componentArray}
                        />
                    </Box>

                    <StyledCard bgcolor="#0b2d28" style={{ width: "100%", margin: "20px 0" }}>
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "5px 0"
                            }}>

                                <CardText mt="0px" mb="5px" fontWeight={600} color="#ffffff">From:</CardText>

                                {account && (
                                    inputBalance
                                        ? <CardText
                                            mt="0px"
                                            mb="5px"
                                            fontWeight={400}
                                            color="#ffffff"
                                            onClick={() => handleTypeInput(inputBalance)}
                                            style={{ cursor: "pointer" }}
                                        >Balance: {inputBalance}</CardText>
                                        : <Box sx={{ minWidth: "100px" }}>
                                            <Skeleton sx={{ bgcolor: '#dedede' }} height={30} />
                                        </Box>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "5px 0"
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "start",
                                width: "200px"
                            }}>
                                <CustomImg src={`./images/trades/${inputCurrency.toLowerCase()}.png`} />
                                <CardText ml="15px" mt="5px" mb="5px" fontWeight={400} color="#ffffff">{inputCurrency}</CardText>
                            </Box>

                            <InputContainer>
                                <TradeInput
                                    disableUnderline={true}
                                    value={formattedAmounts[Field.INPUT]}
                                    onChange={(e: any) => handleTypeInput(e.target.value)} />
                            </InputContainer>
                        </Box>
                    </StyledCard>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <IconButton onClick={handleSwitch}>
                            <HiSwitchVertical style={{ color: "white" }} />
                        </IconButton>
                    </Box>

                    <StyledCard bgcolor="#0b2d28" style={{ width: "100%", margin: "20px 0" }}>
                        <Box>
                            <Box sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "space-between",
                                margin: "5px 0"
                            }}>

                                <CardText mt="0px" mb="5px" fontWeight={600} color="#ffffff">To: (estimated)</CardText>
                                {account && (
                                    outputBalance
                                        ? <CardText
                                            mt="0px"
                                            mb="5px"
                                            fontWeight={400}
                                            color="#ffffff"
                                        >Balance: {outputBalance}</CardText>
                                        : <Box sx={{ minWidth: "100px" }}>
                                            <Skeleton sx={{ bgcolor: '#dedede' }} height={30} />
                                        </Box>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "5px 0"
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "start",
                                width: "200px",
                            }}>
                                <CustomImg src={`./images/trades/${outputCurrency.toLowerCase()}.png`} />
                                <CardText ml="15px" mt="5px" mb="5px" fontWeight={400} color="#ffffff">{outputCurrency}</CardText>
                            </Box>

                            <InputContainer>
                                <TradeInput
                                    disableUnderline={true}
                                    value={formattedAmounts[Field.OUTPUT]}
                                    onChange={(e: any) => handleTypeOutput(e.target.value)}
                                />
                            </InputContainer>
                        </Box>
                    </StyledCard>

                    {
                        (parseFloat(formattedAmounts[Field.OUTPUT]) > 0 ||
                            parseFloat(formattedAmounts[Field.OUTPUT]) > 0) &&
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "5px 0"
                        }}>
                            <CardText mt="0px" mb="5px" fontWeight={600} color="#ffffff">Price</CardText>
                            <CardText mt="0px" mb="5px" fontWeight={400} color="#ffffff">1 {inputCurrency} ≈ {trade?.executionPrice.toFixed(6)} {outputCurrency}</CardText>
                        </Box>
                    }

                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "5px 0"
                    }}>
                        <CardText mt="0px" mb="5px" fontWeight={600} color="#ffffff">Slippage Tolerance</CardText>
                        <CardText mt="0px" mb="5px" fontWeight={400} color="#ffffff">{allowedSlippage.toSignificant(6)} %</CardText>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "5px 0"
                    }}>
                        <CardText mt="0px" mb="5px" fontWeight={600} color="#ffffff">Transaction Deadline</CardText>
                        <CardText mt="0px" mb="5px" fontWeight={400} color="#ffffff">{deadline / 60} min</CardText>
                    </Box>

                    {
                        account
                            ? (
                                showApprove ? <PrimaryButton
                                    onClick={handleApprove}
                                    disabled={approvalState !== ApprovalState.NOT_APPROVED}
                                >{approvalState === ApprovalState.PENDING ? "Approving..." : "Approve"}</PrimaryButton> : <PrimaryButton
                                    onClick={handleSwap}
                                    disabled={Number(inputBalance) === 0 || !isInputValid}
                                >{swapInputError ? swapInputError : "Swap"}</PrimaryButton>)
                            : <UnlockButton />
                    }
                </StyledCard>
            </StyledBox>

            <CustomSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                loading={loadingState.loading}
                loadingMessage={loadingState.loadingMessage}
                success={successState.success}
                successMessage={successState.successMessage}
                error={errorState.error}
                errorMessage={errorState.errorMessage}
                transactionHash={transactionHash}
            />
        </>
    )
}

export default SwapCard