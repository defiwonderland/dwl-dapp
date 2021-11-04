import React, { useState, useCallback } from "react"
import Dialog from '@mui/material/Dialog';
import { FaTimes } from "react-icons/fa"
import { AccountDialogProps } from "../types";
import { CloseButton } from "../elements";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { StyledH3 } from "../../Text";
import { StyledBox, StyledImg } from "../elements";
import { CardText, StyledCard } from "../../Card/elements";
import CustomTab from "../../Tab";
import { styled } from "@mui/system";
import { CopyButton } from "../../Button";
import truncateWalletAddress from "../../../utils/truncateWalletAddress";
import { RiFileCopyLine, RiLogoutBoxRLine } from "react-icons/ri"
import { VariantButton } from "../../Button";

const WalletCard = styled(StyledCard)({
    backgroundImage: "radial-gradient(circle, #ed80e0, #f135da, #f722dd)",
    margin: "10px 0",
    padding: "20px"
})

const AccountDialog: React.FC<AccountDialogProps> = ({
    open,
    handleClose,
    account,
    balance,
    networkName,
    mainToken,
}) => {
    const [info, setInfo] = useState<number>(0)
    const { logout } = useAuth()

    const copy = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(account));
    }, [account])


    const disconnect = useCallback(() => {
        handleClose()
        logout()
    }, [handleClose, logout])

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
                    <StyledH3>Your Account</StyledH3>
                    <CloseButton onClick={() => {
                        handleClose()
                    }}>
                        <FaTimes />
                    </CloseButton>

                    <Box sx={{
                        width: "90%",
                        display: "flex",
                        alignItems: "start",
                        margin: "10px 0"
                    }}>
                        <CustomTab
                            value={info}
                            onChange={(event, newValue) => setInfo(newValue)}
                            labelText={["Wallet", "Transactions"]}
                            bgcolor="transparent"
                            border="1px solid #c29d9d"
                            textcolor="#000000"
                            fontSize="14px"
                        />
                    </Box>

                    <WalletCard>
                        <Grid container spacing={2}>
                            <Grid container item xs={12} sm={3} alignItems="start" justifyContent="start">
                                <Box sx={{
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <StyledImg src="./images/mini-logo.svg" />
                                </Box>
                            </Grid>

                            <Grid container item xs={12} sm={9} alignItems="center" justifyContent="start">
                                <Grid container spacing={2}>
                                    <Grid container item xs={6} sm={4} alignItems="start" justifyContent="start">
                                        <Box>
                                            <CardText fontWeight={400} mt="0px" mb="5px" color="#ffffff">Balance</CardText>
                                            <CardText fontWeight={600} mt="0px" mb="5px" color="#ffffff">{balance?.toFixed(2)} {mainToken}</CardText>
                                        </Box>
                                    </Grid>

                                    <Grid container item xs={6} sm={4} alignItems="start" justifyContent="start">
                                        <Box>
                                            <CardText fontWeight={400} mt="0px" mb="5px" color="#ffffff">Network</CardText>
                                            <CardText fontWeight={600} mt="0px" mb="5px" color="#ffffff">{networkName}</CardText>
                                        </Box>
                                    </Grid>

                                    <Grid container item xs={6} sm={4} alignItems="start" justifyContent="start">
                                        <Box>
                                            <CardText fontWeight={400} mt="0px" mb="5px" color="#ffffff">Wallet</CardText>
                                            <CardText fontWeight={600} mt="0px" mb="5px" color="#ffffff">Metamask</CardText>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </WalletCard>

                    <Box sx={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: "5px",
                        width: "100%"
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>

                            <CardText fontWeight={400} mt="0px" mb="0px" ml="10px" mr="5px">{truncateWalletAddress(String(account), 8, 8)}</CardText>
                            <CopyButton onClick={copy}>
                                <RiFileCopyLine style={{ width: "16px", height: "16px" }} />
                                <span style={{ margin: "0px 5px" }}>Copy</span>
                            </CopyButton>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px",
                    }}>
                        <VariantButton width="230px" minheight="30px" onClick={disconnect}>
                            <RiLogoutBoxRLine style={{ width: "16px", height: "16px" }} />
                            <span style={{ margin: "0px 10px" }}>Disconnect Wallet</span>
                        </VariantButton>
                    </Box>
                </StyledBox>
            </Dialog>
        </>
    )
}

export default AccountDialog