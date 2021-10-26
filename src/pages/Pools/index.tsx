import PoolHeader from "./PoolHeader"
import useActiveWeb3React from "../../hooks/useActiveWeb3React"
import { pools } from "../../config/constants/pools"
import { useFetchFarms } from "../../hooks/useFetchFarms"
import { useFetchEarnings } from "../../hooks/useFetchEarnings"
import PoolOptions from "./PoolOptions"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import PoolCard from "../../components/Card/PoolCard"
import { Grid } from "@mui/material"
import React, { useMemo } from "react"

const Pools: React.FC = () => {
    const { account } = useActiveWeb3React()
    const poolsConfig = useFetchFarms(pools, account)
    const poolsEarnings = useFetchEarnings(pools, false)

    const newPools = useMemo(() => {
        return poolsEarnings.length > 0 ? poolsConfig.map((pool, index) => {
            return {
                ...pool,
                poolEarnings: poolsEarnings[index]
            }
        }) : poolsConfig
    }, [poolsEarnings, poolsConfig])

    return (
        <section style={{ marginTop: "70px" }}>
            <PoolHeader />
            <PoolOptions />

            <Wrapper>
                <WidthWrapper>
                    <Grid container spacing={0}>
                        <Grid container item justifyContent="center" alignItems="center">
                            <PoolCard pools={newPools} />
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Pools