import React from "react";
import { Wrapper, Spacing } from "../../../components/Layout";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { StyledH1, StyledText } from "../../../components/Text";
import { VariantButton } from "../../../components/Button";
import IntroImg from "../../../assets/images/home/mouse.png"
import { StyledImgContent } from "../HomeElements";
import UnlockButton from "../../../components/UnlockButton";
import { useWeb3React } from "@web3-react/core";

const Banner = () => {
    const { account } = useWeb3React()

    return (
        <Wrapper>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid container item sm={12} md={6} alignItems="center" justifyContent="center">
                        <div>
                            <StyledH1>Enter The DeFi <br /> Wonderland Of <br /> The Future</StyledH1>
                            <StyledText>Transact, Invest, Loan &amp; Earn on the Worlds <br />
                                fastest Growing decentralised HUB.</StyledText>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                {
                                    !account && <Box sx={{ width: "100%" }}>
                                        <UnlockButton isVariant={false} width="100%" />
                                    </Box>
                                }

                                <VariantButton style={{ margin: `${account ? "0px" : "0px 10px"}` }}>CTA</VariantButton>
                            </Box>
                        </div>
                    </Grid>

                    <Grid container item sm={12} md={6} alignItems="center" justifyContent="center">
                        <StyledImgContent src={IntroImg} alt="banner" />
                    </Grid>
                </Grid>
            </Box>

            <Spacing />
        </Wrapper>

    )
}

export default Banner