import React from "react"
import { StyledCard, CardTitle, CardText } from "../elements"
import { VoteCardProps } from "../types"
import { Box } from "@mui/system"
import GaugeChart from "../../Chart/GaugeChart"
import { VoteCardButton } from "./elements"

const VoteCard: React.FC<VoteCardProps> = ({ series, title, totalVote, addressVolume }) => {
    return (
        <StyledCard>
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
            }}>
                <GaugeChart series={series} label={title} />

                <Box sx={{
                    margin: "0 10px",
                    flex: 0.9
                }}>
                    <CardTitle>{title}</CardTitle>

                    <Box sx={{ margin: "10px 0" }}>
                        <CardText mt="0px" mb="3px">Total Votes:</CardText>
                        <CardText mt="0px" mb="0px">{totalVote}</CardText>
                    </Box>

                    <Box sx={{ margin: "10px 0" }}>
                        <CardText mt="0px" mb="3px">Addresses:</CardText>
                        <CardText mt="0px" mb="0px">{addressVolume}</CardText>
                    </Box>

                    <VoteCardButton>Vote</VoteCardButton>
                </Box>
            </Box>
        </StyledCard>
    )
}

export default VoteCard