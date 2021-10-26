import React from "react"
import { StyledCardHeading } from "./elements"
import profile from "../../../assets/images/governance/rabbit.png"
import {
    StyledCard,
    StyledTableContainer,
    StyledTableHead,
    StyledTableRow,
    CustomImg,
    CardText
} from "../elements"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box } from "@mui/system";
import DirectionIcon from "../IconCard";
import { LinkEnternal } from "../../Link";
import truncateWalletAddress from "../../../utils/truncateWalletAddress";


const VotingPowerCard = () => {
    return (
        <Box>
            <StyledCardHeading>Top Addresses by Voting Power</StyledCardHeading>
            <StyledCard>
                <StyledTableContainer>
                    <Table aria-label="simple table">
                        <StyledTableHead>
                            <TableRow>
                                <TableCell>ADDRESS</TableCell>
                                <TableCell align="left" />
                                <TableCell align="left">VOTES</TableCell>
                                <TableCell align="left">VOTING POWER</TableCell>
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            <StyledTableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    },
                                    cursor: "auto",
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <CustomImg src={profile} style={{ marginRight: "15px" }} />
                                            <LinkEnternal text={truncateWalletAddress("0xB232D899b39Ee282EC26BBA385497b9FCD150ED3")} color="#000000" />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">
                                    <DirectionIcon isup={true} text="2" />
                                </TableCell>
                                <TableCell align="left">
                                    <CardText fontWeight={400}>1,443,000</CardText>
                                </TableCell>
                                <TableCell align="left">
                                    <CardText fontWeight={400}>15.13%</CardText>
                                </TableCell>
                            </StyledTableRow>

                            <StyledTableRow
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0
                                    },
                                    cursor: "auto",
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                            <CustomImg src={profile} style={{ marginRight: "15px" }} />
                                            <LinkEnternal text={truncateWalletAddress("0xB232D899b39Ee282EC26BBA385497b9FCD150ED3")} color="#000000" />
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell align="left">
                                    <DirectionIcon isup={false} text="3" />
                                </TableCell>
                                <TableCell align="left">
                                    <CardText fontWeight={400}>1,443,000</CardText>
                                </TableCell>
                                <TableCell align="left">
                                    <CardText fontWeight={400}>15.13%</CardText>
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </StyledTableContainer>
            </StyledCard>
        </Box>
    )
}

export default VotingPowerCard