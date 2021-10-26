import React from "react"
import { HeaderConatiner } from "../../../components/Layout"
import { StyledH2 } from "../../../components/Text"

function NftHeader(): JSX.Element {
    return (
        <HeaderConatiner>
            <StyledH2 style={{ color: "#ffffff" }}>Non Fungible Wonders</StyledH2>
        </HeaderConatiner>
    )

}

export default NftHeader