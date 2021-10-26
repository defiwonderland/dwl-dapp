import React from "react"
import { PrimaryButton, VariantButton, ErrorButton } from "../Button"
import { UnsupportedChainIdError } from "@web3-react/core";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import useAuth from "../../hooks/useAuth";
import { ConnectorNames } from "../../utils/web3React"
import { BiPulse } from "react-icons/bi"

interface ButtonType {
    isVariant?: boolean,
    width?: string,
    minheight?: string
}

const UnlockButton: React.FC<ButtonType> = ({ isVariant, width, minheight }) => {
    const { login } = useAuth()
    const { error } = useActiveWeb3React()

    let comp;

    if (error instanceof UnsupportedChainIdError) {
        comp = <ErrorButton width={width} minheight={minheight} onClick={() => login(ConnectorNames.Injected)}>
            <BiPulse />
            <span style={{ marginLeft: "5px" }}>Switch to Matic</span>
        </ErrorButton>
    } else {
        if (isVariant) {
            comp = <VariantButton width={width} minheight={minheight} style={{ margin: "0px" }} onClick={() => login(ConnectorNames.Injected)} >Connect Wallet</VariantButton>
        } else {
            comp = <PrimaryButton width={width} minheight={minheight} onClick={() => login(ConnectorNames.Injected)}>Connect Wallet</PrimaryButton>
        }
    }

    return (
        <div>
            {comp}
        </div>

    )
}

export default React.memo(UnlockButton)