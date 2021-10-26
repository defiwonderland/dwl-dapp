import React from "react"
import { HeaderConatiner } from "../../../components/Layout"
import { StyledH2 } from "../../../components/Text"

function FundsHeader(): JSX.Element {
    return (
        <HeaderConatiner>
            <StyledH2 style={{ color: "#ffffff" }}>Hedge Funds</StyledH2>
        </HeaderConatiner>
    )
}

export default FundsHeader