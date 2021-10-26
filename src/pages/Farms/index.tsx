import React, { useMemo } from "react"
import FarmHeader from "./FarmHeader"
import FarmOptions from "./FarmOptions"
import FarmCard from "../../components/Card/FarmCard"
import { Grid } from "@mui/material"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import { useFetchFarms } from "../../hooks/useFetchFarms"
import useActiveWeb3React from "../../hooks/useActiveWeb3React"
import { useFetchEarnings } from "../../hooks/useFetchEarnings"
import { farms } from "../../config/constants/farms"

const Farms: React.FC = () => {
    const { account } = useActiveWeb3React()
    const farmsConfig = useFetchFarms(farms, account)
    const farmsEarnings = useFetchEarnings(farms, true)

    const newFarms = useMemo(() => {
        return farmsEarnings.length > 0 ? farmsConfig.map((farm, index) => {
            return {
                ...farm,
                farmEarnings: farmsEarnings[index]
            }
        }) : farmsConfig
    }, [farmsEarnings, farmsConfig])

    return (
        <section style={{ marginTop: "70px" }}>
            <FarmHeader />
            <FarmOptions />

            <Wrapper>
                <WidthWrapper>
                    <Grid container spacing={2}>
                        {
                            newFarms?.map(farm => (
                                <Grid container item sm={12} md={6} lg={4} justifyContent="center" alignItems="start" key={farm.pid}>
                                    <FarmCard farm={farm} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Farms
