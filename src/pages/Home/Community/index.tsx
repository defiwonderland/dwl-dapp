import React from "react"
import { Wrapper, TextContainer } from "../../../components/Layout";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledH2, StyledText } from "../../../components/Text";
import { StyledImgContent, CommunityContainer } from "../HomeElements";
import wndr from "../../../assets/images/home/wndr.png"
import { PrimaryButton } from "../../../components/Button";
import { NavLink } from "react-router-dom";

const Community = () => {
    return (
        <Wrapper>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid container item sm={12} alignItems="center" justifyContent="center">
                        <StyledImgContent src={wndr} />
                        <CommunityContainer>
                            <StyledH2 style={{ color: "#ffffff", textAlign: "center" }}>Governed By The Wonderland Community</StyledH2>
                            <TextContainer>
                                <StyledText style={{ color: "#ffffff", textAlign: "center", lineHeight: "2" }}>
                                    $WNDR token is our governance &amp; utility token.
                                    $WNDR token holders have rights to propose network updates, new launchpad listings &amp;
                                    pools, Planet Earth Fund allocation, and vote on adjusting Platform Parameters.
                                    Holders can also stake to earn more crypto and receive platform fees!
                                </StyledText>
                            </TextContainer>

                            <NavLink to="/governance" style={{ textDecoration: "none" }}>
                                <PrimaryButton style={{ width: "200px" }}>Explore Governance</PrimaryButton>
                            </NavLink>
                        </CommunityContainer>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper >
    )
}

export default Community