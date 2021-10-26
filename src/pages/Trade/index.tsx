import React from "react"
import TradeCard from "../../components/Card/TradeCard"
import { WidthWrapper, Wrapper } from "../../components/Layout"

const Trade: React.FC = () => {
    return (
        <section style={{ marginTop: "70px" }}>
            <Wrapper>
                <WidthWrapper>
                    <TradeCard />
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Trade