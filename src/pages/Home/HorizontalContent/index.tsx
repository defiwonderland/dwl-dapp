import React from "react"
import { Wrapper, CenterConatiner } from "../../../components/Layout";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledH2, StyledText } from "../../../components/Text";
import { StyledImgContent } from "../HomeElements";
import cap from "../../../assets/images/home/cap.png"
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import UnlockButton from "../../../components/UnlockButton";

const HorizontalContent = () => {
    const { account } = useActiveWeb3React()

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
                                {
                                    account ? <Box /> : <UnlockButton width="200px" />
                                }
                            </CenterConatiner>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    )
}

export default HorizontalContent