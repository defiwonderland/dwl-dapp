import React, { useState } from "react"
import { Box } from "@mui/system"
import { StyledCard } from "../elements"
import { StyledH3 } from "../../Text"
import { IconButton } from "@mui/material"
import { IoIosArrowBack } from "react-icons/io"
import { ResetButton } from "./elements"
import { RiGasStationFill } from "react-icons/ri"
import { GoPin } from "react-icons/go"
import StyledButtonGroup from "../../ButtonGroup"

const SettingsCard = () => {
    const [gasPrice, setGasPrice] = useState<string>("0")

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        const selectedItem = event.target as HTMLElement
        setGasPrice(selectedItem.innerText)
    }

    return (
        <StyledCard bgcolor="#000000" style={{ margin: "20px 0" }}>
            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(221 219 219 / 25%)"
            }}>
                <IconButton
                    size="medium"
                >
                    <IoIosArrowBack style={{ color: "#ffffff" }} />
                </IconButton>

                <StyledH3 style={{ color: "#ffffff" }}>Settings</StyledH3>

                <ResetButton>Reset</ResetButton>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between",
                margin: "10px 0"
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                }}>
                    <RiGasStationFill style={{ color: "#3c5753", width: "25px", height: "25px" }} />
                    <StyledH3 style={{ color: "#ffffff", margin: "0 10px" }}>Gas Price</StyledH3>
                    <GoPin style={{ color: "#3c5753", width: "25px", height: "25px" }} />
                </Box>
            </Box>

            <StyledButtonGroup
                groupArray={["10 Low", "15 Medium", "20 High", "Custom"]}
                bgcolor="#23423e"
                focuscolor="#74a39d"
                onClick={handleClick}
                padding="22px"
            />
        </StyledCard>
    )
}

export default SettingsCard