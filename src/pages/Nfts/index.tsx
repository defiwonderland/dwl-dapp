import React from "react"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import NftHeader from "./NftHeader"
import NftOptions from "./NftOptions"
import { Grid } from "@mui/material"
import nfts from "../../config/constants/nfts"
import NftCard from "../../components/Card/NftCard"

const Nfts: React.FC = () => {
    return (
        <section style={{ marginTop: "70px" }}>
            <NftHeader />
            <NftOptions />

            <Wrapper>
                <WidthWrapper>
                    <Grid container spacing={2}>
                        {
                            nfts.map(nft => (
                                <Grid container item sm={12} md={6} lg={4} justifyContent="center" alignItems="start" key={nft.id}>
                                    <NftCard id={nft.id} img={nft.img} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </WidthWrapper>
            </Wrapper>
        </section>
    )

}

export default Nfts