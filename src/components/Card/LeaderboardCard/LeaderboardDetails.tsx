import React, { useState } from "react"
import {
    StyledTableRow,
    CustomImg,
    CardText
} from "../elements"
import TableCell from '@mui/material/TableCell';
import { StyledTableCell } from "../elements";
import { Table, TableRow, TableBody } from "@mui/material";
import { Box } from "@mui/system";
import Rating from '@mui/material/Rating';
import { LeaderboardFundConfig } from "../../../config/types";

interface LeaderboardDetailsProps {
    fund: LeaderboardFundConfig
}

const LeaderboardDetails: React.FC<LeaderboardDetailsProps> = ({ fund }) => {
    const [value, setValue] = useState<number | null>(1);

    return (
        <StyledTableRow
            sx={{
                '&:last-child td, &:last-child th': {
                    border: 0
                },
                cursor: "auto",
            }}
        >
            <TableCell>
                <Rating
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    max={1}
                />
            </TableCell>

            <TableCell>{fund.rank}</TableCell>
            <TableCell>{fund.score}</TableCell>
            <TableCell>
                <CustomImg src={`./images/funds/${fund.network}.png`} width="32px" height="32px" />
            </TableCell>
            <TableCell>{fund.pool}</TableCell>
            <TableCell component="th" scope="row">
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "start",
                    width: "100%"
                }}>
                    <CustomImg src={fund.managerImg} width="32px" height="32px" />
                    <CardText ml="10px" mt="0px" mb="0px">{fund.manager}</CardText>
                </Box>
            </TableCell>
            <TableCell align="left">{fund.managedValue}</TableCell>
            <TableCell>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ color: `${fund.oneDay >= 0 ? "#28a745" : "#dc3545"}`, borderBottom: "none" }} align="center" width="30px">{fund.oneDay}%</TableCell>
                            <TableCell sx={{ color: `${fund.oneWeek >= 0 ? "#28a745" : "#dc3545"}`, borderBottom: "none" }} align="center" width="30px">{fund.oneWeek}%</TableCell>
                            <TableCell sx={{ color: `${fund.oneMonth >= 0 ? "#28a745" : "#dc3545"}`, borderBottom: "none" }} align="center" width="30px">{fund.oneMonth}%</TableCell>
                            <TableCell sx={{ color: `${fund.threeMonths >= 0 ? "#28a745" : "#dc3545"}`, borderBottom: "none" }} align="center" width="30px">{fund.threeMonths}%</TableCell>
                            <TableCell sx={{ color: `${fund.sixMonths >= 0 ? "#28a745" : "#dc3545"}`, borderBottom: "none" }} align="center" width="30px">{fund.sixMonths}%</TableCell>
                            <TableCell sx={{ color: `${fund.lifeTime >= 0 ? "#28a745" : "#dc3545"}`, borderBottom: "none" }} align="center" width="78px">{fund.lifeTime}%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableCell>
            <TableCell sx={{ color: "#ffc107" }} align="left">{fund.risk}</TableCell>
        </StyledTableRow >

    )
}

export default LeaderboardDetails