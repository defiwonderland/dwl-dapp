import React, { useState, useCallback } from "react"
import Dialog from '@mui/material/Dialog';
import { FaTimes } from "react-icons/fa"
import { StakeDialogProps } from "../types";
import { Box } from "@mui/system";
import { CloseButton, InputContainer, StakeInput, MaxButton } from "../elements";
import { CardTitle, CardText } from "../../Card/elements";
import { PrimaryButton } from "../../Button";
import { useBonusRewardContract } from "../../../hooks/useContract";
import { getFullDisplayBalance } from "../../../utils/formatBalance";
import BigNumber from "bignumber.js";
import CustomSnackbar from "../../Snackbar";

const StakeDialog: React.FC<StakeDialogProps> = ({
    title,
    desc,
    isDeposit,
    buttonText,
    open,
    handleClose,
    stakeTokenSymbol,
    stakeTokenNumber,
    stakeTokenAddress,
    stakeTokenDecimal,
    walletTokenNumber,
    setStakeTokenNumber
}) => {
    const [inputAmount, setInputAmount] = useState<string>("")
    const [validInputAmount, setValidInputAmount] = useState(true)
    const bonusRewardContract = useBonusRewardContract()
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [transcationHash, setTransactionHash] = useState<string>("")
    const [loadingMessage, setLoadingMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleMaxAmount = useCallback(() => {
        setValidInputAmount(true)
        if (isDeposit) {
            setInputAmount(String(walletTokenNumber))
        } else {
            setInputAmount(String(stakeTokenNumber))
        }
    }, [isDeposit, walletTokenNumber, stakeTokenNumber])

    const handleIsValid = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        validateAllFields(e.target.value)
    }

    const validateAllFields = (fieldValue: string) => {
        setInputAmount(fieldValue)
        if (isDeposit) {
            if (!isNaN(Number(fieldValue)) && Number(fieldValue) > 0 && Number(fieldValue) <= Number(walletTokenNumber)) {
                setValidInputAmount(true)
            } else {
                setValidInputAmount(false)
            }
        } else {
            if (!isNaN(Number(fieldValue)) && Number(fieldValue) > 0 && Number(fieldValue) <= Number(stakeTokenNumber)) {
                setValidInputAmount(true)
            } else {
                setValidInputAmount(false)
            }
        }
    }

    const handleClick = async () => {
        handleClose()
        setInputAmount("")
        setLoading(true)
        setOpenSnackbar(true)
        setSuccess(false)
        setError(false)
        setLoadingMessage("")
        setSuccessMessage("")
        setErrorMessage("")
        setTransactionHash("")

        const fullDisplayAmount = getFullDisplayBalance(new BigNumber(inputAmount), stakeTokenDecimal)

        if (isDeposit) {
            try {
                setLoadingMessage(`Depositing ${inputAmount} ${stakeTokenSymbol}...`)
                const result = await bonusRewardContract?.deposit(stakeTokenAddress, fullDisplayAmount)

                if (result) {
                    const newStakeTokenNumber = Number(stakeTokenNumber) + Number(inputAmount)
                    setStakeTokenNumber(newStakeTokenNumber)
                    setTransactionHash(result.hash)
                    setSuccess(true)
                    setLoading(false)
                    setSuccessMessage(`Congrats! You have deposited ${inputAmount} ${stakeTokenSymbol}. `)
                }
            } catch (error: any) {
                setError(true)
                setLoading(false)
                setErrorMessage(`Oops! Failed to deposit ${stakeTokenSymbol}. Please try again!`)
            }
        } else {
            try {
                setLoadingMessage(`Withdrawing ${inputAmount} ${stakeTokenSymbol}...`)
                const result = await bonusRewardContract?.withdraw(stakeTokenAddress, fullDisplayAmount)

                if (result) {
                    const newStakeTokenNumber = Number(stakeTokenNumber) - Number(inputAmount)
                    setStakeTokenNumber(newStakeTokenNumber)
                    setSuccess(true)
                    setLoading(false)
                    setTransactionHash(result.hash)
                    setSuccessMessage(`Congrats! You have withdrawn ${inputAmount} ${stakeTokenSymbol}. `)
                }
            } catch (error: any) {
                setError(true)
                setLoading(false)
                setErrorMessage(`Oops! Failed to withdraw ${stakeTokenSymbol}. Please try again!`)
            }

        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose();
                    }
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "30px",
                }}>
                    <CloseButton onClick={() => {
                        handleClose()
                        setValidInputAmount(true)
                        setInputAmount("")
                    }}>
                        <FaTimes />
                    </CloseButton>

                    <CardTitle>{title}</CardTitle>
                    <CardText mt="10px" mb="10px">{desc}</CardText>
                    <InputContainer>
                        <StakeInput
                            value={inputAmount}
                            disableUnderline={true}
                            onChange={(e) => handleIsValid(e)}
                        />

                        <MaxButton onClick={handleMaxAmount}>MAX</MaxButton>
                    </InputContainer>

                    {!validInputAmount && <CardText mt="10px" mb="10px" color="#dc3545">* Please enter valid {stakeTokenSymbol} amount</CardText>}

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        marginTop: "10px"
                    }}>
                        <PrimaryButton style={{ minHeight: "20px", width: "100px" }} disabled={!validInputAmount} onClick={handleClick}>{buttonText}</PrimaryButton>
                    </Box>
                </Box>
            </Dialog>

            <CustomSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                loading={loading}
                loadingMessage={loadingMessage}
                success={success}
                successMessage={successMessage}
                error={error}
                errorMessage={errorMessage}
                transactionHash={transcationHash}
            />
        </>

    );
}

export default StakeDialog