import React from "react"
import { Wrapper, TextContainer, Spacing } from "../../../components/Layout";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { StyledH2, StyledText } from "../../../components/Text";
import { PrimaryButton } from "../../../components/Button";
import { VerticalContentProps } from "./types";

const VerticalContent: React.FC<VerticalContentProps> = ({ title, desc, buttonText }) => {
    return (
        <Wrapper>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0}>
                    <Grid container item sm={12} alignItems="center" justifyContent="center">
                        <TextContainer>
                            <StyledH2 style={{ textAlign: "center" }}>{title}</StyledH2>
                            <Spacing />
                            <StyledText style={{ textAlign: "center" }}>{desc}</StyledText>
                            {
                                buttonText && <Box sx={{
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <PrimaryButton style={{ width: "200px" }}>{buttonText}</PrimaryButton>
                                </Box>

                            }

                        </TextContainer>
                    </Grid>
                </Grid>
            </Box>
        </Wrapper>
    )
}

export default VerticalContent