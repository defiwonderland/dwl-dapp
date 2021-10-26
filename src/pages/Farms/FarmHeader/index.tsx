import React from "react"
import { HeaderConatiner } from "../../../components/Layout"
import { StyledH2 } from "../../../components/Text"

function FarmHeader(): JSX.Element {
    return (
        <HeaderConatiner>
            <StyledH2 style={{ color: "#ffffff" }}>Wonderland Farms</StyledH2>
        </HeaderConatiner>
    )

}

export default FarmHeader