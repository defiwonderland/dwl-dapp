import React from "react"
import { Wrapper, Spacing } from "../../../components/Layout";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledH2, StyledText } from "../../../components/Text";
import StatsCard from "../../../components/Card/StatsCard";
import bx1 from "../../../assets/images/home/bx1.png"
import bx2 from "../../../assets/images/home/bx2.png"
import bx3 from "../../../assets/images/home/bx3.png"

const Stats = () => {

    return (
        <Wrapper>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid container item sm={12} md={6} alignItems="center" justifyContent="center">
                        <div>
                            <StyledH2>The Highest <br /> Earnings Available <br /> On The Blockchain</StyledH2>
                            <Spacing />
                            <StyledText>DeFi Link is trusted by People, DAO’s,<br />
                                Enterprises &amp; Businesses alike to work <br />
                                smarter, not harder.
                            </StyledText>
                        </div>

                    </Grid>

                    <Grid container item sm={12} md={6} alignItems="center" justifyContent="center">
                        <StatsCard stats="2.8M" desc="Users" color="#0035f0" img={bx1} />
                        <StatsCard stats="22M" desc="Transactions" color="#FA02DC" img={bx2} />
                        <StatsCard stats="2.8M" desc="Liquidity Accessed" color="#33dfcc" img={bx3} />
                    </Grid>
                </Grid>
            </Box>

        </Wrapper>
    )

}

export default Stats