import React from "react"
import { HeaderConatiner } from "../../../components/Layout"
import { StyledH2 } from "../../../components/Text"

function LaunchpadHeader(): JSX.Element {
    return (
        <HeaderConatiner>
            <StyledH2 style={{ color: "#ffffff" }}>Wonderland Launch Pad</StyledH2>
        </HeaderConatiner>
    )

}

export default LaunchpadHeader