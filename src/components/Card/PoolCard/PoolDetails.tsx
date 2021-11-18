import React, { useState, useCallback, useEffect } from "react"
import {
    StyledTableRow,
    StyledTableCell,
    CustomImg,
    CardText,
    StakeButton
} from "../elements"
import TableCell from '@mui/material/TableCell';
import {
    CollapseContainer,
    StakeContainer
} from "./elements";
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import { Box } from "@mui/system";
import { RiArrowRightSFill } from "react-icons/ri"
import { Grid } from "@mui/material";
import { LinkEnternal } from "../../Link";
import UnlockButton from "../../UnlockButton";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { VariantButton } from "../../Button";
import { Pool } from "../types"
import moment from "moment"
import { getAddressOnScan } from "../../../utils/getChainInfo";
import { useBonusRewardContract, useTokenContract } from "../../../hooks/useContract"
import { useBonusRewardAllowance } from "../../../hooks/useAllowance"
import { useBonusRewardApprove } from "../../../hooks/useApprove"
import { useTokenBalance } from "../../../hooks/useTokenBalance"
import StakeDialog from "../../Dialog/StakeDialog"
import CustomSnackbar from "../../Snackbar"
import BigNumber from "bignumber.js"


const chainId = Number(process.env.REACT_APP_CHAIN_ID)

interface PoolDetailsProps {
    pool: Pool
}

const PoolDetails: React.FC<PoolDetailsProps> = ({ pool }) => {
    const stakeTokenAddress = pool.stakeToken.address
    const isPoolEnded = pool.poolEarnings?.isFarmEnded
    const [stakeTokenNumber, setStakeTokenNumber] = useState<number | undefined>()
    const now = Math.floor(Date.now() / 1000)
    const endTime = pool.poolEarnings?.endTime
    const leftTime = Number(endTime) - now
    const duration = moment.duration(leftTime, 'seconds');
    const [expanded, setExpanded] = React.useState(false);
    const { account } = useActiveWeb3React()
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false)
    const [openDepositDialog, setOpenDepositDialog] = useState(false)
    const bonusRewardContract = useBonusRewardContract()
    const stakeTokenContract = useTokenContract(stakeTokenAddress) as any
    const tokenBalance = useTokenBalance(stakeTokenContract, pool.stakeToken.decimals)
    const { onApprove } = useBonusRewardApprove(stakeTokenContract)
    const bonusRewardAllowance = new BigNumber(useBonusRewardAllowance(stakeTokenContract) || 0).toNumber()
    const needsApproval = bonusRewardAllowance === 0
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [transcationHash, setTransactionHash] = useState<string>("")
    const [loadingMessage, setLoadingMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    let comp;

    useEffect(() => {
        setStakeTokenNumber(pool.stakeTokenNumber)
    }, [pool.stakeTokenNumber])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleApprove = useCallback(async () => {
        setLoading(true)
        setOpenSnackbar(true)
        setSuccess(false)
        setError(false)
        setLoadingMessage("")
        setSuccessMessage("")
        setErrorMessage("")
        setTransactionHash("")

        try {
            setLoadingMessage(`Approving contract for ${pool.stakeToken.symbol}...`)
            const txHash = await onApprove()
            if (txHash) {
                setSuccess(true)
                setLoading(false)
                setSuccessMessage(`Congrats! You have approved contract for ${pool.stakeToken.symbol}`)
            } else {
                setError(true)
                setLoading(false)
                setErrorMessage(`Oops! Failed to approve contract for ${pool.stakeToken.symbol}`)
            }
        } catch (e: any) {
            console.error(e)
        }
    }, [onApprove, pool.stakeToken.symbol])

    const harvestRewards = async () => {
        setLoading(true)
        setOpenSnackbar(true)
        setSuccess(false)
        setError(false)
        setLoadingMessage("")
        setSuccessMessage("")
        setErrorMessage("")
        setTransactionHash("")

        try {
            setLoadingMessage(`Harvesting ${pool.rewards?.toFixed(3)} ${pool.rewardToken.symbol}`)
            const result = await bonusRewardContract?.deposit(stakeTokenAddress, 0)

            if (result) {
                setTransactionHash(result.hash)
                setSuccess(true)
                setLoading(false)
                setSuccessMessage(`Congrats! You have harvested ${pool.rewards?.toFixed(3)} ${pool.rewardToken.symbol}.`)
            }
        } catch (error) {
            setError(true)
            setLoading(false)
            setErrorMessage(`Oops! Failed to harvest ${pool.rewardToken.symbol}. Please try again!`)
        }
    }


    if (account) {
        if (needsApproval) {
            comp = <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                minWidth: "90px"
            }}>
                <VariantButton
                    minheight="30px"
                    width="120px"
                    disabled={account === null}
                    style={{ color: "#ffffff" }}
                    onClick={handleApprove}
                > Approve
                </VariantButton>
            </Box>
        } else {
            comp = <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                minWidth: "90px"
            }}>
                <StakeButton
                    color="inherit"
                    onClick={() => setOpenWithdrawDialog(true)}
                    disabled={Number(pool.stakeTokenNumber) === 0}

                > -
                </StakeButton>
                <StakeButton
                    color="inherit"
                    onClick={() => setOpenDepositDialog(true)}
                    disabled={Number(tokenBalance) === 0 || isPoolEnded}
                >+</StakeButton>
            </Box>
        }
    } else {
        comp = <UnlockButton isVariant={true} minheight="30px" width="200px" textcolor="#FFFFFF" />
    }

    return (
        <>
            <StyledTableRow
                sx={{
                    '&:last-child td, &:last-child th': {
                        border: 0
                    }
                }}

                onClick={handleExpandClick}
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
                            <CustomImg src={`./images/pools/${pool.stakeToken.symbol.toLowerCase()}.png`} />
                            <RiArrowRightSFill style={{ color: "#687d7a", width: "20px", height: "20px" }} />
                            <CustomImg src={`./images/pools/${pool.rewardToken.symbol.toLowerCase()}.png`} />
                            <CardText ml="20px" fontWeight={400}>{pool.stakeToken.symbol}</CardText>
                        </Box>
                    </Box>
                </TableCell>
                <TableCell align="left">
                    <CardText fontWeight={400}>{pool.poolEarnings ? pool.poolEarnings?.apr : "0.000"}%</CardText>
                </TableCell>
                <TableCell align="left">
                    <CardText fontWeight={400}>${pool.poolEarnings ? pool.poolEarnings?.tvl : "0.000"}</CardText>
                </TableCell>
                <TableCell align="left">
                    <CardText fontWeight={400}>{pool.rewards ? `${pool.rewards?.toFixed(3)} ${pool.rewardToken.symbol}` : `0.000 ${pool.rewardToken.symbol}`}</CardText>
                </TableCell>
                <TableCell align="left">
                    <CardText fontWeight={400}>{isPoolEnded ? "Finished" : "Live"}</CardText>
                </TableCell>
                <TableCell align="right">
                    {account ?
                        <VariantButton
                            minheight="30px"
                            width="200px"
                            disabled={account === null || Number(pool.rewards) === 0}
                            onClick={harvestRewards}
                        >
                            Harvest</VariantButton> :
                        <UnlockButton isVariant={true} minheight="30px" width="200px" />}
                </TableCell>
            </StyledTableRow>

            {
                expanded && <TableRow>
                    <StyledTableCell colSpan={12}>
                        <Collapse in={expanded} style={{ display: "block" }} timeout="auto">
                            <CollapseContainer>
                                <Grid container spacing={2}>
                                    <Grid container item xs={5} alignItems="center">
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        }}>
                                            <CardText fontWeight={600} mt="10px" mb="10px" color="#ffffff">Ends in:</CardText>
                                            <CardText fontWeight={400} mt="10px" mb="10px" color="#ffffff">{
                                                isPoolEnded ? "Finished" : `${duration.days() ? duration.days() : "0"} days, ${duration.hours() ? duration.hours() : "0"} hours, ${duration.minutes() ? duration.minutes() : "0"} mins`
                                            } </CardText>

                                        </Box>

                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        }}>
                                            <CardText fontWeight={600} mt="10px" mb="10px" color="#ffffff">Total Staked:</CardText>
                                            <CardText fontWeight={400} mt="10px" mb="10px" color="#ffffff">
                                                {pool.poolEarnings?.totalStakeTokenNumber} {pool.stakeToken.symbol}
                                            </CardText>
                                        </Box>

                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        }}>
                                            <CardText fontWeight={600} mt="10px" mb="10px" color="#ffffff">Stake:</CardText>
                                            <Box>
                                                <LinkEnternal text="WNDR" href={getAddressOnScan(chainId, pool.stakeToken.address)} />
                                            </Box>

                                        </Box>
                                    </Grid>

                                    <Grid container item xs={7} alignItems="center" justifyContent="center">
                                        <StakeContainer>
                                            <CardText fontWeight={600} mt="10px" mb="10px" color="#ffffff">WNDR Staked:</CardText>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: "center",
                                                justifyContent: "space-between"
                                            }}>
                                                <CardText fontWeight={500} mt="0px" mb="0px" color="#ffffff">{stakeTokenNumber ? stakeTokenNumber : "0.000"}</CardText>
                                                {comp}
                                            </Box>
                                        </StakeContainer>
                                    </Grid>
                                </Grid>
                            </CollapseContainer>
                        </Collapse>
                    </StyledTableCell>
                </TableRow>
            }

            <TableRow>
                <StyledTableCell colSpan={12}>
                    <StakeDialog
                        title={`Deposit ${pool.stakeToken.symbol}`}
                        desc={`${tokenBalance} ${pool.stakeToken.symbol} in Wallet`}
                        open={openDepositDialog}
                        handleClose={() => setOpenDepositDialog(false)}
                        buttonText="Deposit"
                        stakeTokenSymbol={pool.stakeToken.symbol}
                        stakeTokenNumber={stakeTokenNumber}
                        stakeTokenAddress={stakeTokenAddress}
                        stakeTokenDecimal={pool.stakeToken.decimals}
                        walletTokenNumber={tokenBalance}
                        isDeposit={true}
                        setStakeTokenNumber={setStakeTokenNumber}
                    />

                    <StakeDialog
                        title={`Withdraw ${pool.stakeToken.symbol}`}
                        desc={`${pool.stakeTokenNumber} ${pool.stakeToken.symbol} Staked`}
                        open={openWithdrawDialog}
                        handleClose={() => setOpenWithdrawDialog(false)}
                        buttonText="Withdraw"
                        stakeTokenSymbol={pool.stakeToken.symbol}
                        stakeTokenNumber={stakeTokenNumber}
                        stakeTokenAddress={stakeTokenAddress}
                        stakeTokenDecimal={pool.stakeToken.decimals}
                        walletTokenNumber={tokenBalance}
                        isDeposit={false}
                        setStakeTokenNumber={setStakeTokenNumber}
                    />

                    <CustomSnackbar
                        open={openSnackbar}
                        onClose={() => setOpenSnackbar(false)}
                        loading={loading}
                        loadingMessage={loadingMessage}
                        success={success}
                        successMessage={successMessage}
                        error={error}
                        errorMessage={errorMessage}
                        transactionHash={transcationHash}
                    />
                </StyledTableCell>
            </TableRow>
        </>
    )
}


export default PoolDetails