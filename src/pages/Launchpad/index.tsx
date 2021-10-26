import React from "react"
import LaunchpadHeader from "./LaunchpadHeader"
import { useFetchIdos } from "../../hooks/useFetchIdos"
import LaunchpadOptions from "./LaunchpadOptions"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import { Grid } from "@mui/material"
import LaunchpadCard from "../../components/Card/LaunchpadCard"

function Launchpad(): JSX.Element {
    const idos = useFetchIdos()

    return (
        <section style={{ marginTop: "70px" }}>
            <LaunchpadHeader />
            <LaunchpadOptions />

            <Wrapper>
                <WidthWrapper>
                    <Grid container spacing={0}>
                        {
                            idos.map(ido => (
                                <Grid container item sm={12} md={6} lg={4} justifyContent="center" alignItems="center" key={ido.id}>
                                    <LaunchpadCard ido={ido} />
                                </Grid>
                            ))
                        }

                    </Grid>
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Launchpad