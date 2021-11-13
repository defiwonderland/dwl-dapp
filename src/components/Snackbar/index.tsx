import React from "react"
import Snackbar from '@mui/material/Snackbar';
import { FaTimes } from "react-icons/fa"
import { SnackbarProps } from "./types";
import { SnackbarContainer, CloseButton, IconContainer } from "./elements";
import { CardText } from "../Card/elements";
import CircularProgress from '@mui/material/CircularProgress';
import { BiErrorCircle } from "react-icons/bi"
import { FaCheckCircle } from "react-icons/fa"
import { Box } from "@mui/system";
import { getTranscationHash } from "../../utils/getChainInfo";
import { FiExternalLink } from "react-icons/fi"

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const CustomSnackbar: React.FC<SnackbarProps> = ({
    open,
    onClose,
    loading,
    loadingMessage,
    success,
    successMessage,
    error,
    errorMessage,
    transactionHash,
}) => {
    const handleClose = (
        event: React.SyntheticEvent | React.MouseEvent,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose()
    };

    let comp;

    if (loading) {
        comp = <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "300px",
        }}>
            <CircularProgress size="25px" />
            <CardText mr="15px" ml="10px" mt="0px" mb="0px">{loadingMessage}</CardText>
        </Box>
    } else {
        if (success) {
            comp = <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "300px",
            }}>
                <IconContainer color="#28a745">
                    <FaCheckCircle />
                </IconContainer>
                <CardText mr="15px" ml="10px" mt="0px" mb="0px">
                    {successMessage}
                </CardText>

                <CloseButton onClick={() => window.open(getTranscationHash(chainId, transactionHash), '_blank')}>
                    <FiExternalLink />
                </CloseButton>
            </Box >
        } else if (error) {
            comp = <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: "300px",
            }}>
                <IconContainer color="#dc3545">
                    <BiErrorCircle />
                </IconContainer>

                <CardText mr="15px" ml="10px" mt="0px" mb="0px">
                    {errorMessage}
                </CardText>
            </Box >
        }
    }

    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <SnackbarContainer>
                    {comp}
                    <CloseButton onClick={handleClose} >
                        <FaTimes />
                    </CloseButton>
                </SnackbarContainer>
            </Snackbar>
        </>
    );
}

export default CustomSnackbar