import React from "react"
import { HeaderConatiner } from "../../../components/Layout"
import { StyledH2 } from "../../../components/Text"

function PoolHeader(): JSX.Element {
    return (
        <HeaderConatiner>
            <StyledH2 style={{ color: "#ffffff" }}>Wonderland Staking Pools</StyledH2>
        </HeaderConatiner>
    )

}

export default PoolHeader