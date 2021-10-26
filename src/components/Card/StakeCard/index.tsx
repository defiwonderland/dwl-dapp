import React, { useState } from "react"
import { StyledCard, NormalText } from "../elements"
import { Box } from "@mui/system"
import CustomTab from "../../Tab"
import { StyledIconButton } from "../../Button"
import { FiSettings } from "react-icons/fi"
import { SmallText, StakeTokenBox } from "./elements"
import { StyledText, StyledH3 } from "../../Text"
import StyledButtonGroup from "../../ButtonGroup"
import { VariantButton } from "../../Button"

const StakeCard = () => {
    const [stakeStaus, setStakeStatus] = useState<number>(0)
    const [percentage, setPercentage] = useState<string>("0")

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const selectedItem = event.target as HTMLElement
        setPercentage(selectedItem.innerText)
    }

    return (
        <StyledCard bgcolor="#000000">
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "5px",
            }}>
                <Box sx={{ width: "80%" }}>
                    <CustomTab
                        value={stakeStaus}
                        onChange={(event, newValue) => setStakeStatus(newValue)}
                        labelText={["Stake Token", "Unstake Token"]}
                        bgcolor="#0b2d28"
                        selectedcolor="#3c5753"
                        fontSize="14px"
                    />
                </Box>

                <StyledIconButton bgcolor="#0b2d28">
                    <FiSettings />
                </StyledIconButton>
            </Box>

            <Box sx={{ marginBottom: "20px" }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <SmallText>Enter Amount</SmallText>
                    <SmallText>Balance: 0</SmallText>
                </Box>

                <StyledCard bgcolor="#0b2d28" style={{ width: "100%" }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 0.7
                        }}>
                            <StakeTokenBox>
                                <img src="/images/mini-logo.svg" alt="logo" height="34px" />
                            </StakeTokenBox>

                            <StyledH3 style={{ color: "#ffffff" }}>WNDR</StyledH3>
                            <span style={{ color: " #6c757d" }}>|</span>
                            <StyledH3 style={{ color: "#ffffff" }}>1.0</StyledH3>
                        </Box>

                        <StyledText style={{ color: "#ffffff" }}>≈ $2.57</StyledText>
                    </Box>

                    <StyledButtonGroup
                        groupArray={["25%", "50%", "75%", "100%"]}
                        bgcolor="#23423e"
                        focuscolor="#74a39d"
                        onClick={handleClick}
                    />
                </StyledCard>
            </Box>

            <VariantButton style={{ color: "#fff", margin: "0" }}>Connect Wallet</VariantButton>

            <Box sx={{ margin: "5px 0" }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <NormalText>Voting Balance</NormalText>
                    <NormalText>--</NormalText>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <NormalText>Voting Power</NormalText>
                    <NormalText>--</NormalText>
                </Box>
            </Box>
        </StyledCard >
    )
}

export default StakeCard