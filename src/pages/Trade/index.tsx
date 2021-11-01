import React from "react"
import TradeCard from "../../components/Card/TradeCard"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import { Box } from "@mui/system"
const Trade: React.FC = () => {
    return (
        <section style={{ marginTop: "70px" }}>
            <Wrapper>
                <WidthWrapper>
                    <Box>
                        <TradeCard />
                    </Box>
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Trade