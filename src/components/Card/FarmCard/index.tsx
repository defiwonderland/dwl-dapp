import React, { useState, useCallback, useEffect } from "react"
import {
    FarmImg,
    TagImg,
    FarmTag,
} from "./elements"
import {
    StyledCard,
    CardTitle,
    CardText,
    Divider,
    StakeButton
} from "../elements"
import { Box } from "@mui/system"
import tagImg from "../../../assets/images/farms/ic1.png"
import BigNumber from "bignumber.js"
import useActiveWeb3React from "../../../hooks/useActiveWeb3React"
import { useBonusRewardContract, useERC20 } from "../../../hooks/useContract"
import { useBonusRewardAllowance } from "../../../hooks/useAllowance"
import { useBonusRewardApprove } from "../../../hooks/useApprove"
import { useTokenBalance } from "../../../hooks/useTokenBalance"
import { PrimaryButton, ExpandButton } from "../../Button"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { getAddressOnScan } from "../../../utils/getChainInfo"
import Collapse from '@mui/material/Collapse';
import { LinkEnternal } from "../../Link"
import UnlockButton from "../../UnlockButton"
import StakeDialog from "../../Dialog/StakeDialog"
import { Farm } from "../types"
import CustomSnackbar from "../../Snackbar"

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

interface FarmCardProps {
    farm: Farm
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
    const stakeTokenAddress = farm.stakeToken.address
    const [stakeTokenNumber, setStakeTokenNumber] = useState<number | undefined>()
    const [expanded, setExpanded] = React.useState(false);
    const { account } = useActiveWeb3React()
    const isAccountNull = account === undefined
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false)
    const [openDepositDialog, setOpenDepositDialog] = useState(false)
    const bonusRewardContract = useBonusRewardContract()
    const stakeTokenContract = useERC20(stakeTokenAddress) as any
    const tokenBalance = useTokenBalance(stakeTokenContract, farm.stakeToken.decimals)
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

    useEffect(() => {
        setStakeTokenNumber(farm.stakeTokenNumber)
    }, [farm.stakeTokenNumber])

    let comp;

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
            setLoadingMessage(`Approving contract for ${farm.stakeToken.symbol}...`)
            const txHash = await onApprove()
            if (txHash) {
                setSuccess(true)
                setLoading(false)
                setSuccessMessage(`Congrats! You have approved contract for ${farm.stakeToken.symbol}`)
            } else {
                setError(true)
                setLoading(false)
                setErrorMessage(`Oops! Failed to approve contract for ${farm.stakeToken.symbol}`)
            }
        } catch (e: any) {
            console.error(e)
        }
    }, [onApprove, farm.stakeToken.symbol])

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
            setLoadingMessage(`Harvesting ${farm.rewards?.toFixed(3)} ${farm.rewardToken.symbol}`)
            const result = await bonusRewardContract?.deposit(stakeTokenAddress, 0)

            if (result) {
                setTransactionHash(result.hash)
                setSuccess(true)
                setLoading(false)
                setSuccessMessage(`Congrats! You have harvested ${farm.rewards?.toFixed(3)} ${farm.rewardToken.symbol}.`)
            }
        } catch (error) {
            setError(true)
            setLoading(false)
            setErrorMessage(`Oops! Failed to harvest ${farm.rewardToken.symbol}. Please try again!`)
        }
    }

    if (account) {
        if (needsApproval) {
            comp = <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <CardText fontWeight={500} mt="0px" mb="0px">{stakeTokenNumber ? stakeTokenNumber : "0.000"}</CardText>

                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "90px"
                }}>
                </Box>
                <PrimaryButton
                    width="90px"
                    style={{ minWidth: "70px" }}
                    disabled={isAccountNull}
                    onClick={handleApprove}
                > Approve
                </PrimaryButton>
            </Box>
        } else {
            comp = <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <CardText fontWeight={500} mt="0px" mb="0px">{stakeTokenNumber ? stakeTokenNumber.toFixed(3) : "0.000"}</CardText>

                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "90px"
                }}>
                    <StakeButton
                        onClick={() => setOpenWithdrawDialog(true)}
                        disabled={Number(farm.stakeTokenNumber) === 0}
                    > -
                    </StakeButton>
                    <StakeButton
                        onClick={() => setOpenDepositDialog(true)}
                        disabled={Number(tokenBalance) === 0}
                    >+</StakeButton>
                </Box>
            </Box>
        }
    } else {
        comp = <UnlockButton isVariant={true} />
    }

    return (
        <>
            <StyledCard>
                <Box>
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
                            <FarmImg src="./images/farms/wndr-bnb.png" />
                            <CardTitle>{farm.stakeToken.symbol}</CardTitle>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <TagImg src={tagImg} />
                                <CardTitle>Core</CardTitle>
                            </Box>

                            <FarmTag>40X</FarmTag>
                        </Box>
                    </Box>

                    <Box sx={{
                        padding: "10px",
                        display: 'flex',
                        alignItems: "center",
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "start",
                        }}>
                            <CardText mr="5px">APR:</CardText>
                            <CardText fontWeight={500}>{farm.farmEarnings ? farm.farmEarnings?.apr : "0.000"}%</CardText>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "start",
                            marginLeft: "25px"
                        }}>
                            <CardText mr="5px">Earn:</CardText>
                            <CardText fontWeight={500}>{farm.rewardToken.symbol} + Fees</CardText>
                        </Box>
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ padding: "10px" }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Box>
                            <CardText mb="5px" mt="0px">{farm.rewardToken.symbol} EARNED</CardText>
                            <CardText fontWeight={500} mt="0px" mb="0px">{farm.rewards ? farm.rewards.toFixed(3) : "0.000"}</CardText>
                        </Box>

                        <PrimaryButton
                            width="90px"
                            style={{ minWidth: "70px" }}
                            disabled={isAccountNull || Number(farm.rewards) === 0}
                            onClick={harvestRewards}
                        > Harvest
                        </PrimaryButton>
                    </Box>

                    <Box sx={{ marginTop: "30px" }}>
                        <CardText mb="10px" mt="0px">{farm.stakeToken.symbol} LP STAKED</CardText>
                        {comp}
                    </Box>
                </Box>

                <Box sx={{
                    paddingTop: "25px",
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ExpandButton endIcon={expanded ? <MdArrowDropUp /> : <MdArrowDropDown />} onClick={handleExpandClick}>More Details</ExpandButton>
                </Box>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Box sx={{ padding: "10px" }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "start",
                        }}>
                            <CardText mb="0px" mt="0px" mr="5px">Total Liquidity:</CardText>
                            <CardText fontWeight={500} mt="0px" mb="0px">${farm.farmEarnings?.tvl ? farm.farmEarnings?.tvl : "0.000"}</CardText>
                        </Box>
                        <LinkEnternal text={`Get ${farm.stakeToken.symbol} SLP`} href="https://www.google.com" />
                        <LinkEnternal text="View Contract" href={getAddressOnScan(chainId, stakeTokenAddress)} />
                        <LinkEnternal text="See Pair Info" href="https://www.google.com" />
                    </Box>
                </Collapse>
            </StyledCard >

            <StakeDialog
                title={`Deposit ${farm.stakeToken.symbol} SLP`}
                desc={`${tokenBalance} ${farm.stakeToken.symbol} SLP in Wallet`}
                open={openDepositDialog}
                handleClose={() => setOpenDepositDialog(false)}
                buttonText="Deposit"
                stakeTokenSymbol={farm.stakeToken.symbol}
                stakeTokenNumber={stakeTokenNumber}
                stakeTokenAddress={stakeTokenAddress}
                stakeTokenDecimal={farm.stakeToken.decimals}
                walletTokenNumber={tokenBalance}
                isDeposit={true}
                setStakeTokenNumber={setStakeTokenNumber}
            />

            <StakeDialog
                title={`Withdraw ${farm.stakeToken.symbol} SLP`}
                desc={`${farm.stakeTokenNumber} ${farm.stakeToken.symbol} LP Staked`}
                open={openWithdrawDialog}
                handleClose={() => setOpenWithdrawDialog(false)}
                buttonText="Withdraw"
                stakeTokenSymbol={farm.stakeToken.symbol}
                stakeTokenNumber={stakeTokenNumber}
                stakeTokenAddress={stakeTokenAddress}
                stakeTokenDecimal={farm.stakeToken.decimals}
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
        </>
    )
}

export default FarmCard
