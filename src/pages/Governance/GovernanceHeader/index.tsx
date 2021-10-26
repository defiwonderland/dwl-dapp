import React from "react"
import { HeaderConatiner } from "../../../components/Layout"
import { StyledH2 } from "../../../components/Text"

function GovernanceHeader(): JSX.Element {
    return (
        <HeaderConatiner>
            <StyledH2 style={{ color: "#ffffff" }}>Wonderland Governance</StyledH2>
        </HeaderConatiner>
    )
}

export default GovernanceHeader