import React, { useState } from "react"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import FundsHeader from "./FundsHeader"
import FundsOptions from "./FundsOptions"
import { StyledH3 } from "../../components/Text"
import UnlockButton from "../../components/UnlockButton"
import { Box } from "@mui/system"
import { Grid } from "@mui/material"
import useActiveWeb3React from "../../hooks/useActiveWeb3React"
import FundsCard from "../../components/Card/FundsCard"
import { featuredFunds, topFunds } from "../../config/constants/funds"
import LeaderboardCard from "../../components/Card/LeaderboardCard"
import { leaderboardFunds } from "../../config/constants/funds"
import CustomTab from "../../components/Tab"
import CustomInput from "../../components/Input"
import { FaSearch } from "react-icons/fa"
import { InputAdornment } from "@mui/material"
import CustomSelect from "../../components/Select"
import { menuItems } from "../../components/Select/types"
import { BiFilterAlt } from "react-icons/bi"
import CustomSwitch from "../../components/Switch"
import PublicPostCard from "../../components/Card/PublicPostCard"
import { posts } from "../../config/constants/funds"

const Funds: React.FC = () => {
    const { account } = useActiveWeb3React()
    const [fundsOptions, setFundsOptions] = useState<number>(0)
    const [fund, setFund] = useState<string>("")
    const [select, setSelect] = useState("Network")
    const [fundsCheck, setFundsCheck] = useState<boolean>(false)

    const selectOptions: menuItems[] = [
        {
            value: "Network",
            label: "Network"
        },
        {
            value: "Pool",
            label: "Pool"
        },
        {
            value: "Manager",
            label: "Manager"
        },
    ]

    return (
        <section style={{ marginTop: "70px" }}>
            <FundsHeader />
            <FundsOptions />

            <Wrapper>
                <WidthWrapper>
                    <Box sx={{
                        marginBottom: "40px",
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            margin: "10px 0"
                        }}>
                            <StyledH3>Featured Funds</StyledH3>
                            {!account && <UnlockButton isVariant={true} />}
                        </Box>

                        <Grid container spacing={5}>
                            {
                                featuredFunds.map(fund => (
                                    <Grid container item sm={6} alignItems="start" justifyContent="center" key={fund.fid}>
                                        <FundsCard direction={true} fund={fund} />
                                    </Grid>
                                ))

                            }
                        </Grid>
                    </Box>

                    <Box sx={{
                        marginBottom: "40px",
                    }}>
                        <StyledH3 style={{ marginBottom: "10px" }}>Top Funds</StyledH3>

                        <Grid container spacing={5}>
                            {
                                topFunds.map(fund => (
                                    <Grid container item sm={6} md={4} alignItems="start" justifyContent="center" key={fund.fid}>
                                        <FundsCard direction={false} fund={fund} />
                                    </Grid>
                                ))

                            }
                        </Grid>
                    </Box>

                    <Box sx={{
                        marginBottom: "40px",
                    }}>
                        <Grid container spacing={2} marginBottom="20px">
                            <Grid container item lg={4} alignItems="center" justifyContent="start">
                                <StyledH3>Leaderboard</StyledH3>
                            </Grid>

                            <Grid container item lg={8} alignItems="center" justifyContent="end">
                                <Grid container spacing={2}>
                                    <Grid container item md={6} alignItems="center" justifyContent="center">
                                        <Box sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <CustomTab
                                                value={fundsOptions}
                                                onChange={(event, newValue) => setFundsOptions(newValue)}
                                                labelText={["All", "Favourite", "Trending"]}
                                                bgcolor="transparent"
                                                border="1px solid #c29d9d"
                                                textcolor="#000000"
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid container item md={6} alignItems="center" justifyContent="center">
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            flexGrow: 1,
                                        }}>
                                            <CustomSelect
                                                value={select}
                                                onClick={(e) => console.log(e)}
                                                onChange={(e) => setSelect(e.target.value as string)}
                                                options={selectOptions}
                                                iconImg={<BiFilterAlt style={{ color: "#ffffff", width: "18px", height: "18px" }} />}
                                                isPopover={false}
                                                bgcolor={"transparent"}
                                                textcolor="#000000"
                                            />
                                            <CustomInput
                                                value={fund}
                                                onChange={(e) => setFund(e.target.value)}
                                                placeholder="Search fund"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <FaSearch style={{ color: "#000000", width: "18px", height: "18px" }} />
                                                    </InputAdornment>
                                                }
                                                textcolor="#000000"
                                                bgcolor="transparent"
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <LeaderboardCard funds={leaderboardFunds} />
                    </Box>

                    <Box sx={{
                        marginBottom: "40px",
                    }}>
                        <Grid container spacing={2} marginBottom="20px">
                            <Grid container item md={2} alignItems="center" justifyContent="start">
                                <StyledH3>Public Posts</StyledH3>
                            </Grid>

                            <Grid container item md={10} alignItems="center" justifyContent="start">

                                <CustomSwitch
                                    checked={fundsCheck}
                                    onChange={e => setFundsCheck(e.target.checked)}
                                    labelText="Show only my invested funds"
                                    textcolor="#000000"
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={5}>
                            {
                                posts.map(post => (
                                    <Grid container item sm={6} alignItems="start" justifyContent="center" key={post.pid}>
                                        <PublicPostCard post={post} />
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </Box>
                </WidthWrapper>
            </Wrapper>
        </section >
    )
}

export default Funds