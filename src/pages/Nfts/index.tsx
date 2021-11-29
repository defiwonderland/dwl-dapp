import React from "react"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import NftHeader from "./NftHeader"
import NftOptions from "./NftOptions"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import NftCard from "../../components/Card/NftCard"
import { useGetAllCollections } from "../../hooks/useFetchWonderVerse"
import useActiveWeb3React from "../../hooks/useActiveWeb3React"
import UnlockButton from "../../components/UnlockButton"
import { StyledH2 } from "../../components/Text"
import { PrimaryButton } from "../../components/Button"
import { Link } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';

const Nfts: React.FC = () => {
    const { account } = useActiveWeb3React()
    const collections = useGetAllCollections(account)
    const isMounted = collections && collections.length >= 0

    let comp;

    if (isMounted) {
        if (collections.length > 0) {
            comp = <Grid container spacing={2}>
                {
                    collections.map(collection => (
                        <Grid container item sm={12} md={6} lg={4} justifyContent="center" alignItems="start" key={collection.id}>
                            <NftCard collection={collection} />
                        </Grid>
                    ))
                }
            </Grid>
        } else {
            comp = <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <StyledH2 style={{ textAlign: "center" }}>Vist Wonderland Metavrse to <br /> generate your WonderVerse NFTs</StyledH2>
                <Link to="/wonderverse" style={{ textDecoration: "none" }}>
                    <PrimaryButton>Visit WonderVerse</PrimaryButton>
                </Link>
            </Box >
        }
    } else {
        comp = <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <CircularProgress size="45px" />
        </Box>
    }

    return (
        <section style={{ marginTop: "70px" }}>
            <NftHeader />
            <NftOptions />

            <Wrapper>
                <WidthWrapper>
                    {
                        account ? comp : <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <StyledH2 style={{ textAlign: "center" }}>Unlock your wallet to view <br /> your WonderVerse NFTs</StyledH2>
                            <UnlockButton />
                        </Box>
                    }
                </WidthWrapper>
            </Wrapper>
        </section>
    )

}

export default Nfts