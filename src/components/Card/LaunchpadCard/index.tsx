import React, { useState } from "react"
import {
    LaunchpadImg,
} from "./elements"
import {
    StyledCard,
    CardTitle,
    CardText,
    Divider
} from "../elements"
import { Box } from "@mui/system"
import { ExpandButton } from "../../Button"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { useFetchBalance } from "../../../hooks/useFetchBalance"
import useActiveWeb3React from "../../../hooks/useActiveWeb3React"
import IdoDialog from "../../Dialog/IdoDialog"
import Collapse from '@mui/material/Collapse';
import { LinkEnternal } from "../../Link"
import UnlockButton from "../../UnlockButton"
import { VariantButton } from "../../Button"
import { Ido } from "../types"
import moment from "moment"
import numeral from "numeral"
import { getIdoAddress } from "../../../utils/addressHelpers"
import CustomProgressBar from "../../Progress/CustomLinearProgress"

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

interface LaunchpadCardProps {
    ido: Ido
}

const LaunchpadCard: React.FC<LaunchpadCardProps> = ({ ido }) => {
    const now = Math.floor(Date.now() / 1000)
    const endTime = ido.closingTime
    const leftTime = Number(endTime) - now
    const duration = moment.duration(leftTime, 'seconds');
    const { account } = useActiveWeb3React()
    const mainTokenBalance = useFetchBalance()
    const [expanded, setExpanded] = useState(false);
    const [openIdoDialog, setOpenIdoDialog] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
                            <LaunchpadImg src={`../images/launchpad/${ido.id}.png`} />

                            <Box>
                                <CardTitle>{ido.name}</CardTitle>
                                <CardText mt="10px" mb="5px">Goal: {ido.rate ? numeral(ido.salesAmount / ido.rate).format("0,0") : "0"} {ido.mainToken}</CardText>
                            </Box>
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
                                <CardTitle>Not Rated</CardTitle>
                            </Box>
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
                            <CardText mr="5px">Ends in:</CardText>
                            <CardText fontWeight={500}>{`${duration.months() ? duration.months() : "0"} months, ${duration.days() ? duration.days() : "0"} days, ${duration.hours() ? duration.hours() : "0"} hours, ${duration.minutes() ? duration.minutes() : "0"} mins`}</CardText>
                        </Box>
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ padding: "10px" }}>
                    <Box>
                        <CardText mb="0px" mt="0px" mr="5px">Introduction: </CardText>
                        <CardText fontWeight={500} mt="0px" mb="0px">{ido.description}</CardText>
                    </Box>

                    <Box sx={{ margin: "20px 0" }}>
                        <CardText mb="0px" mt="0px" mr="5px">{ido.id.toUpperCase()} IDO Sales Progression: </CardText>
                        <CustomProgressBar value={ido.remainingTokens ? (1 - Number(ido.remainingTokens) / ido.salesAmount) * 100 : 0} />
                    </Box>

                    <Box sx={{ marginTop: "30px" }}>
                        {account ? <VariantButton style={{ margin: "0px" }} onClick={() => setOpenIdoDialog(true)} disabled={!ido.isOpen || ido.hasClosed}>Participate</VariantButton> : <UnlockButton isVariant={true} />}
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
                            margin: "10px 0"
                        }}>
                            <CardText mb="0px" mt="0px" mr="5px">Ticker Price: </CardText>
                            <CardText fontWeight={500} mt="0px" mb="0px">1 {ido.mainToken} = {ido.rate} {ido.id.toUpperCase()}</CardText>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "start",
                            margin: "10px 0"
                        }}>
                            <CardText mb="0px" mt="0px" mr="5px">Token type: </CardText>
                            <CardText fontWeight={500} mt="0px" mb="0px">ERC20</CardText>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "start",
                            margin: "10px 0"
                        }}>
                            <CardText mb="0px" mt="0px" mr="5px">Fundraising Goal: </CardText>
                            <CardText fontWeight={500} mt="0px" mb="0px"> {ido.rate ? numeral(ido.salesAmount / ido.rate).format("0,0") : "0"} {ido.mainToken}</CardText>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "start",
                            margin: "10px 0"
                        }}>
                            <CardText mb="0px" mt="0px" mr="5px">Total IDO Tokens: </CardText>
                            <CardText fontWeight={500} mt="0px" mb="0px">{numeral(ido.salesAmount).format("0,0")} {ido.id.toUpperCase()}</CardText>
                        </Box>

                        <LinkEnternal text="View Website" href={ido.projectSiteUrl} />
                    </Box>
                </Collapse>
            </StyledCard>

            <IdoDialog
                name={ido.id.toUpperCase()}
                account={account}
                open={openIdoDialog}
                handleClose={() => setOpenIdoDialog(false)}
                title={`Participate ${ido.id.toUpperCase()} IDO`}
                desc={`${mainTokenBalance} ${ido.mainToken} in wallet`}
                mainToken={ido.mainToken}
                walletTokenNumber={mainTokenBalance}
                idoAddress={getIdoAddress(ido, chainId)}
                rate={ido.rate}
            />
        </>
    )
}

export default LaunchpadCard
