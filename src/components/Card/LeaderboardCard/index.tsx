import React from "react"
import {
    StyledCard,
    StyledTableCell,
    StyledTableContainer,
    StyledTableHead,
} from "../elements"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { LeaderboardFundConfig } from "../../../config/types";
import LeaderboardDetails from "./LeaderboardDetails";
import { FaRegQuestionCircle } from "react-icons/fa"

interface LeaderboardCardProps {
    funds: LeaderboardFundConfig[]
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ funds }) => {
    return (
        <StyledCard>
            <StyledTableContainer>
                <Table aria-label="simple table">
                    <StyledTableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>RANK &nbsp;
                                <FaRegQuestionCircle />
                            </TableCell>
                            <TableCell>SCORE &nbsp;
                                <FaRegQuestionCircle />
                            </TableCell>
                            <TableCell align="left" >NETWORK</TableCell>
                            <TableCell align="left">POOL</TableCell>
                            <TableCell align="left">MANAGER</TableCell>
                            <TableCell align="left">TOTAL VALUE MANAGED</TableCell>
                            <TableCell align="center">
                                PERFORMANCE
                                <Table>
                                    <StyledTableHead>
                                        <TableRow>
                                            <StyledTableCell align="center" width="50px">1D</StyledTableCell>
                                            <StyledTableCell align="center" width="50px">1W</StyledTableCell>
                                            <StyledTableCell align="center" width="50px">1M</StyledTableCell>
                                            <StyledTableCell align="center" width="50px">3M</StyledTableCell>
                                            <StyledTableCell align="center" width="50px">6M</StyledTableCell>
                                            <StyledTableCell align="center" width="100px">LIFETIME</StyledTableCell>
                                        </TableRow>
                                    </StyledTableHead>
                                </Table>
                            </TableCell>
                            <TableCell align="left">RISK FACTOR &nbsp;
                                <FaRegQuestionCircle />
                            </TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {
                            funds.map(fund => (
                                <LeaderboardDetails key={fund.rank} fund={fund} />
                            ))
                        }
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </StyledCard >
    )
}

export default LeaderboardCard