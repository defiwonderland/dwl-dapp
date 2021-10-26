import React from "react"
import { Wrapper, CenterConatiner } from "../../../components/Layout";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledH2, StyledText } from "../../../components/Text";
import { PrimaryButton } from "../../../components/Button";
import { StyledImgContent } from "../HomeElements";
import cap from "../../../assets/images/home/cap.png"

const HorizontalContent = () => {
    return (
        <Wrapper>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid container item sm={12} md={6} alignItems="center" justifyContent="center">
                        <StyledImgContent src={cap} />
                    </Grid>

                    <Grid container item sm={12} md={6} alignItems="center" justifyContent="center">
                        <div>
                            <StyledH2>Build Passive <br /> Wealth with Crypto</StyledH2>
                            <StyledText>DeFi Link makes it easy to make your Crypto <br />
                                or Stablecoins work for you.
                            </StyledText>
                            <CenterConatiner>
                                <PrimaryButton style={{ width: "200px" }}>Connect Wallet</PrimaryButton>
                            </CenterConatiner>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    )
}

export default HorizontalContent