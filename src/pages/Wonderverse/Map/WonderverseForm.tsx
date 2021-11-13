import React, { useState, useCallback } from "react"
import { FormProps } from "./types"
import { CardTitle, CardText } from "../../../components/Card/elements"
import { PopupLayout, StyledTextArea, StyledImageUploader } from "./Elements"
import { create } from 'ipfs-http-client'
import { Box } from "@mui/system"
import CustomInput from "../../../components/Input"
import { InputAdornment } from "@mui/material"
import { FaTwitter } from "react-icons/fa"
import validator from "validator"
import { PrimaryButton, VariantButton } from "../../../components/Button"
import useActiveWeb3React from "../../../hooks/useActiveWeb3React"
import UnlockButton from "../../../components/UnlockButton"
import { useWndrApprove } from "../../../hooks/useApprove"
import { useWonderVerseContract } from "../../../hooks/useContract"
import { getWonderVerseAddress } from "../../../utils/addressHelpers"
import {
    useSnackbarState,
    useLoadingState,
    useErrorState,
    useTransactionHash,
    useSuccessState
} from "../../../state/snackbar/hooks"

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const WonderverseForm: React.FC<FormProps> = ({ info, setPopupInfo, baseInfo, tokenBalance, allowance, setShowForm }) => {
    const { id, city } = info
    const [twitterName, setTwitterName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [validImage, setValidImage] = useState<boolean>(true)
    const [validDescription, setValidDescription] = useState<boolean>(true)
    const [validTwitter, setValidTwitter] = useState<boolean>(true);
    const [file, setFile] = useState<any>(null);
    const [buffer, setBuffer] = useState<any>(null);
    const setOpenSnackbar = useSnackbarState()[1]
    const setLoadingState = useLoadingState()[1]
    const setSuccessState = useSuccessState()[1]
    const setTransactionHash = useTransactionHash()[1]
    const setErrorState = useErrorState()[1]
    const wonderVerseAddress = getWonderVerseAddress(chainId)
    const wonderVerseContract = useWonderVerseContract() as any
    const needsApproval = Number(allowance) <= 0
    const isQualified = Number(tokenBalance) >= Number(baseInfo?.minimumTokenAmount)
    const { onApprove } = useWndrApprove(wonderVerseAddress)
    const { account } = useActiveWeb3React()

    const handleApprove = useCallback(async () => {
        setLoadingState({ loading: true, loadingMessage: "Approving your WNDR Token..." })
        setSuccessState({ success: false, successMessage: "" })
        setErrorState({ error: false, errorMessage: "" })
        setOpenSnackbar(true)
        setTransactionHash("")

        try {
            const txHash = await onApprove()
            if (txHash) {
                setLoadingState({ loading: false, loadingMessage: "" })
                setSuccessState({ success: true, successMessage: "Congrats! You have approved contract for your WNDR Token" })
                setTransactionHash(txHash)
            } else {
                setLoadingState({ loading: false, loadingMessage: "" })
                setErrorState({ error: true, errorMessage: "Oops! Failed to approve contract for your WNDR Token" })
            }
        } catch (e: any) {
            console.error(e)
        }
    }, [onApprove, setLoadingState, setSuccessState, setErrorState, setOpenSnackbar, setTransactionHash])

    const validateAllFields = (field: string, fieldValue: string) => {
        if (field === 'description') {
            setDescription(fieldValue)
            if (validator.isLength(fieldValue, { min: 1, max: 50 })) {
                setValidDescription(true)
            } else {
                setValidDescription(false)
            }
        }

        if (field === 'twitter') {
            setTwitterName(fieldValue)
            if (validator.isLength(fieldValue, { min: 1, max: 50 })) {
                setValidTwitter(true)
            } else {
                setValidTwitter(false)
            }
        }


        if (field === 'image') {
            const maxAllowedSize = 5 * 1024 * 1024;
            if (Number(fieldValue) > maxAllowedSize) {
                setValidImage(false)
            } else {
                setValidImage(true)
            }
        }
    }

    const handleIsValid = (e: any, field: string) => {
        validateAllFields(field, e);
    }

    const captureFile = (event: any) => {
        event.preventDefault()
        const image = event.target.files[0]
        if (image) {
            handleIsValid(image.size, 'image')

            const urlReader = new window.FileReader()
            const bufferReader = new window.FileReader()
            urlReader.readAsDataURL(image)
            bufferReader.readAsArrayBuffer(image)

            urlReader.onload = (arg) => {
                setFile(arg.target?.result)
            }

            bufferReader.onloadend = () => {
                const arrayBuffer = new Uint8Array(bufferReader.result as ArrayBuffer)
                setBuffer(Buffer.from(arrayBuffer));
            }
        } else {
            setFile(null)
            setValidImage(false)
        }
    }

    const onSubmit = async (event: any) => {
        event.preventDefault()
        setLoadingState({ loading: true, loadingMessage: "Uploading Image to ipfs..." })
        setSuccessState({ success: false, successMessage: "" })
        setErrorState({ error: false, errorMessage: "" })
        setOpenSnackbar(true)
        setTransactionHash("")

        const response = await ipfs.add(buffer) as any

        if (response) {
            const hash = response.path
            setLoadingState({ loading: true, loadingMessage: "WonderVerse Form Submitting..." })

            try {
                const result = await wonderVerseContract.bid(id, city, hash, description, twitterName)

                if (result) {
                    setTransactionHash(result.hash)
                    setLoadingState({ loading: false, loadingMessage: "" })
                    setSuccessState({ success: true, successMessage: `Congrats! You have bidded the place in ${city}` })
                    setPopupInfo(null)
                    setShowForm(false)
                }
            } catch {
                setLoadingState({ loading: false, loadingMessage: "" })
                setErrorState({ error: true, errorMessage: `Oops! Failed to bid the place in ${city}. Please try again.` })
                setPopupInfo(null)
                setShowForm(false)
            }

        } else {
            setLoadingState({ loading: false, loadingMessage: "" })
            setErrorState({ error: true, errorMessage: "Oops! Failed to upload image. Please try again." })
            setPopupInfo(null)
            setShowForm(false)
        }
    }

    return (
        <>
            <PopupLayout>
                <CardTitle>Wonderverse Bid Form</CardTitle>
                <CardText mt="5px" mb="5px">City: {info.city}</CardText>

                <form onSubmit={onSubmit}>
                    <Box sx={{ marginBottom: "10px" }}>
                        <Box>
                            <CardText mt="5px" mb="5px">Twitter Username: (without @):</CardText>
                            <CustomInput
                                value={twitterName}
                                onChange={(e) => handleIsValid(e.currentTarget.value, "twitter")}
                                placeholder="Enter Twitter Name..."
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FaTwitter style={{ color: "#0092e9", width: "18px", height: "18px" }} />
                                    </InputAdornment>
                                }
                                textcolor="#000000"
                                bgcolor="transparent"
                                margin="0px"
                            />
                        </Box>
                    </Box>

                    <Box sx={{ marginBottom: "10px" }}>
                        <CardText mt="5px" mb="5px">* Descriptons:</CardText>
                        <StyledTextArea
                            value={description}
                            placeholder="Enter your descriptions..."
                            style={{ width: "300px" }}
                            minRows={2}
                            onChange={(e) => handleIsValid(e.currentTarget.value, "description")}
                            required
                        />
                    </Box>

                    <Box sx={{ marginBottom: "10px" }}>
                        <CardText mt="5px" mb="5px">* Upload Images:</CardText>
                        <StyledImageUploader
                            type="file"
                            name="img"
                            accept="image/*"
                            required
                            onChange={captureFile}
                        />

                        <Box>
                            {file && <img src={file} alt="board" style={{ marginTop: "10px", maxWidth: "100px", maxHeight: "100px" }} />}
                        </Box>
                    </Box>

                    {
                        account ? <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "5px 0",
                            width: "100%"
                        }}>
                            <PrimaryButton width="120px" minheight="30px" onClick={handleApprove} disabled={!needsApproval || !isQualified}>Approve</PrimaryButton>
                            <VariantButton width="120px" minheight="30px" style={{ margin: "0px" }} type="submit" disabled={!validDescription || !validImage || !validTwitter || !isQualified || !validImage || needsApproval}>Submit</VariantButton>
                        </Box> : <Box sx={{ margin: "5px 0" }}>
                            <UnlockButton isVariant={false} />
                        </Box>
                    }

                    <Box>
                        {account && !validDescription && <CardText color="#dc3545" mt="5px" mb="5px">Sorry! Text Size is 1 - 50</CardText>}

                        {account && !isQualified && <CardText color="#dc3545" mt="5px" mb="5px">Sorry! Minmum required {baseInfo?.minimumTokenAmount} WNDR</CardText>}

                        {account && !validImage && <CardText color="#dc3545" mt="5px" mb="5px">Sorry! Maximum Image Size is: 5MB</CardText>}

                        {account && !validTwitter && <CardText color="#dc3545" mt="5px" mb="5px">Sorry! Please enter a valid twitter name</CardText>}
                    </Box>
                </form>
            </PopupLayout>
        </>
    )
}

export default React.memo(WonderverseForm)
