import React from "react"
// import TradeCard from "../../components/Card/TradeCard"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import { StyledBox } from "../../components/Card/TradeCard/elements"
import { styled } from "@mui/system"

const StyledIframe = styled('iframe')(({ theme }) => ({
    width: "100%",
    height: "600px",

    [theme.breakpoints.between("lg", "xl")]: {
        minHeight: "800px",
    },

    [theme.breakpoints.between("md", "lg")]: {
        minHeight: "700px",
        maxHeight: "750px",
    },

    [theme.breakpoints.down("md")]: {
        height: "800px"
    }
}))

const Trade: React.FC = () => {
    return (
        <section style={{ marginTop: "70px" }}>
            <Wrapper>
                <WidthWrapper>
                    <StyledBox>
                        <StyledIframe src="https://app.sushi.com/swap" title="sushiswap" scrolling="no" />
                    </StyledBox>
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Trade