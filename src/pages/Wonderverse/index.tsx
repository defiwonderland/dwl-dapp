import React from "react"
import WonderverseHeader from "./WonderverseHeader"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import Mapbox from "./Map/Mapbox"

const Wonderverse: React.FC = () => {
    return (
        <section style={{ marginTop: "70px" }}>
            <WonderverseHeader />

            <Wrapper>
                <WidthWrapper>
                    <Mapbox />
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Wonderverse