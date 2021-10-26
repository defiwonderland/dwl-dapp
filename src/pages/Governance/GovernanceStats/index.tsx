import React from "react"
import { Grid } from "@mui/material"
import { StyledH3, StyledText } from "../../../components/Text"
import { Box } from "@mui/system"
import DirectionIcon from "../../../components/Card/IconCard"

const GovernanceStats: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid container item sm={12} md={6} alignItems="start">
                <Box sx={{
                    padding: "0px 10px"
                }}>
                    <StyledText style={{ marginBottom: "5px", textAlign: "left" }}>Voting Addresses</StyledText>
                    <StyledH3 style={{ marginBottom: "5px" }}>9,035</StyledH3>
                    <DirectionIcon isup={true} text="+2.899% vs last week" />
                </Box>
            </Grid>

            <Grid container item sm={12} md={6} alignItems="start">
                <Box sx={{
                    padding: "0px 10px"
                }}>
                    <StyledText style={{ marginBottom: "5px", textAlign: "left" }}>Staked Tokens</StyledText>
                    <StyledH3 style={{ marginBottom: "5px" }}>9,521,141.098</StyledH3>
                    <DirectionIcon isup={false} text="-1.899% vs last week" />
                </Box>
            </Grid>
        </Grid>
    )
}

export default GovernanceStats