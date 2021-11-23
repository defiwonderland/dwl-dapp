import React, { useState } from "react"
import CustomSelect from "../../../components/Select"
import { OptionsContainer, WidthWrapper } from "../../../components/Layout"
import CustomInput from "../../../components/Input"
import { FaSearch } from "react-icons/fa"
import { BiSort } from "react-icons/bi"
import { InputAdornment } from "@mui/material"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { menuItems } from "../../../components/Select/types"
import CustomSwitch from "../../../components/Switch"
import CustomTab from "../../../components/Tab"
import PopoverList, { componentElement } from "../../../components/Popover"
import { useWindowWidth } from "../../../hooks/useWindowWidth"
import { IconButton } from '@mui/material';
import { BsThreeDotsVertical } from "react-icons/bs"
import { styled } from "@mui/system"

const StyledSelectBox = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: "0px 10px",

    [theme.breakpoints.down("sm")]: {
        width: "auto",
        margin: "0px"
    }
}))

function FarmOptions(): JSX.Element {
    const [farm, setFarm] = useState("")
    const [filter, setFilter] = useState("Hot")
    const [checked, setChecked] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [status, setStatus] = useState(0)
    const windowWidth = useWindowWidth(600)
    const options: menuItems[] = [
        {
            value: "Hot",
            label: "Sort by: Hot"
        },
        {
            value: "APR",
            label: "Sort by: APR"
        },
        {
            value: "Liquidity",
            label: "Sort by: Liquidity"
        },
    ]

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const listItem = event.target as HTMLElement
        const formatListItem = listItem.innerText.split(": ")[1]
        setFilter(formatListItem)
    }

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const comp1 = <CustomSwitch
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
        labelText="Staked Only"
    />

    const comp2 = <CustomTab
        value={status}
        onChange={(event, newValue) => setStatus(newValue)}
        labelText={["Live", "Finished"]}
        smbgcolor="#a2afad"
    />

    const buttonComponent = <IconButton onClick={handlePopoverClick}>
        <BsThreeDotsVertical width="18px" height="18px" />
    </IconButton>

    const componentArray: componentElement[] = [
        {
            id: "1",
            content: comp1,
        },
        {
            id: "2",
            content: comp2,
        }
    ]

    return (
        <OptionsContainer>
            <WidthWrapper>
                <Grid container spacing={0}>
                    <Grid container item sm={12} md={6} justifyContent="center" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: 0.8
                        }}>
                            <StyledSelectBox>
                                <CustomSelect
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value as string)}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <BiSort style={{ color: "#ffffff", width: "18px", height: "18px" }} />
                                        </InputAdornment>
                                    }
                                    options={options}
                                    onClick={handleClick}
                                    iconImg={<BiSort style={{ color: "#ffffff", width: "18px", height: "18px" }} />}
                                    isPopover={true}
                                />
                            </StyledSelectBox>

                            <CustomInput
                                value={farm}
                                onChange={(e) => setFarm(e.target.value)}
                                placeholder="Search Farms"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FaSearch style={{ color: "#ffffff", width: "18px", height: "18px" }} />
                                    </InputAdornment>
                                }
                            />

                            {!windowWidth && <PopoverList
                                buttonComponent={buttonComponent}
                                anchorEl={anchorEl}
                                onClose={() => setAnchorEl(null)}
                                componentArray={componentArray}
                            />}
                        </Box>
                    </Grid>

                    <Grid container sm={12} md={6} item justifyContent="center" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {windowWidth && comp1}
                            {windowWidth && comp2}
                        </Box>
                    </Grid>
                </Grid>
            </WidthWrapper>
        </OptionsContainer>
    )
}

export default FarmOptions
