import React from "react"
import {
    StyledCard,
    StyledTableContainer,
    StyledTableHead,
} from "../elements"
import PoolDetails from "./PoolDetails";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Pool } from "../types"


interface PoolCardProps {
    pools: Pool[]
}

const PoolCard: React.FC<PoolCardProps> = ({ pools }) => {
    return (
        <>
            <StyledCard>
                <StyledTableContainer>
                    <Table aria-label="simple table">
                        <StyledTableHead>
                            <TableRow>
                                <TableCell>TOKEN</TableCell>
                                <TableCell align="left">APR</TableCell>
                                <TableCell align="left">TOTAL STAKED</TableCell>
                                <TableCell align="left">EARNEND</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left" />
                            </TableRow>
                        </StyledTableHead>
                        <TableBody>
                            {
                                pools.map(pool => (
                                    <PoolDetails pool={pool} key={pool.pid} />
                                ))
                            }

                        </TableBody>
                    </Table>
                </StyledTableContainer >
            </StyledCard >
        </>
    )
}

export default PoolCard