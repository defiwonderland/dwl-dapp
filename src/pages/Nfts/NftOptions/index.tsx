import React, { useState } from "react"
import { OptionsContainer, WidthWrapper } from "../../../components/Layout"
import { menuItems } from "../../../components/Select/types"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import CustomSelect from "../../../components/Select"
import { InputAdornment } from "@mui/material"
import { BiSort, BiFilterAlt } from "react-icons/bi"

const NftOptions = () => {
    const [sort, setSort] = useState("Hot")
    const [filter, setFilter] = useState("Filter 1")
    const [collections, setCollections] = useState("Collections 1")

    const sortOptions: menuItems[] = [
        {
            value: "Hot",
            label: "Sort by: Hot"
        },
        {
            value: "Volume",
            label: "Sort by: Volume"
        },
        {
            value: "Price",
            label: "Sort by: Price"
        },
    ]

    const filterOptions: menuItems[] = [
        {
            value: "Filter 1",
            label: "Filter by: Filter 1"
        },
        {
            value: "Filter 2",
            label: "Filter by: Filter 2"
        },
        {
            value: "Filter 3",
            label: "Filter by: Filter 3"
        },
    ]

    const collectionOptions: menuItems[] = [
        {
            value: "Collections 1",
            label: "Collections 1"
        },
        {
            value: "Collections 2",
            label: "Collections 2"
        },
        {
            value: "Collections 3",
            label: "Collections 3"
        },
    ]

    const handleSortClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const listItem = event.target as HTMLElement
        const formatListItem = listItem.innerText.split(": ")[1]
        setSort(formatListItem)
    }

    const handleFilterClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const listItem = event.target as HTMLElement
        const formatListItem = listItem.innerText.split(": ")[1]
        setFilter(formatListItem)
    }

    return (
        <OptionsContainer>
            <WidthWrapper>
                <Grid container spacing={2}>
                    <Grid container item xs={5} justifyContent="flex-end" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: 1
                        }}>
                            <CustomSelect
                                value={sort}
                                onChange={(e) => setFilter(e.target.value as string)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BiSort style={{ color: "#ffffff", width: "18px", height: "18px" }} />
                                    </InputAdornment>
                                }
                                options={sortOptions}
                                onClick={handleSortClick}
                                iconImg={<BiSort style={{ color: "#ffffff", width: "18px", height: "18px" }} />}
                                isPopover={true}
                            />

                            <Box sx={{ margin: "0 5px" }} />

                            <CustomSelect
                                value={filter}
                                onChange={(e) => setFilter(e.target.value as string)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BiFilterAlt style={{ color: "#ffffff", width: "18px", height: "18px" }} />
                                    </InputAdornment>
                                }
                                options={filterOptions}
                                onClick={handleFilterClick}
                                iconImg={<BiFilterAlt style={{ color: "#ffffff", width: "18px", height: "18px" }} />}
                                isPopover={true}
                            />
                        </Box>
                    </Grid>

                    <Grid container item xs={7} justifyContent="center" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            width: "70%"
                        }}>
                            <CustomSelect
                                value={collections}
                                onClick={(e) => console.log(e)}
                                onChange={(e) => setCollections(e.target.value as string)}
                                options={collectionOptions}
                                iconImg={<BiFilterAlt style={{ color: "#ffffff", width: "18px", height: "18px" }} />}
                                isPopover={false}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </WidthWrapper>
        </OptionsContainer>
    )

}

export default NftOptions