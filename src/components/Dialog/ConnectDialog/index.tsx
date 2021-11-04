import React from "react"
import Dialog from '@mui/material/Dialog';
import { FaTimes } from "react-icons/fa"
import { ConnectDialogProps } from "../types";
import { CloseButton } from "../elements";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { ConnectorNames } from "../../../utils/web3React"
import { StyledH3 } from "../../Text";
import { wallets } from "../../../config/constants/wallets";
import { StyledBox, StyledImg } from "../elements";
import { CardText } from "../../Card/elements";

const ConnectDialog: React.FC<ConnectDialogProps> = ({ open, handleClose }) => {
    const { login } = useAuth()

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
                <StyledBox>
                    <StyledH3>Connect Wallet</StyledH3>
                    <CloseButton onClick={() => {
                        handleClose()
                    }}>
                        <FaTimes />
                    </CloseButton>

                    <Grid container spacing={2} marginTop="5px">
                        {
                            wallets.map(wallet => (
                                <Grid container item xs={6} sm={4} alignItems="start" justifyContent="center" key={wallet.wid}>
                                    <div onClick={() => login(ConnectorNames.Injected)}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}
                                        >
                                            <StyledImg src={wallet.image} />
                                            <CardText mt="0px" mb="0px" style={{ textAlign: "center" }}>{wallet.name}</CardText>
                                        </Box>
                                    </div>
                                </Grid>
                            ))
                        }
                    </Grid>
                </StyledBox>
            </Dialog>
        </>
    )
}

export default ConnectDialog