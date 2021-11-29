import React, { useState } from "react"
import { Popup } from "react-map-gl"
import { PostOrBidProps } from "./types"
import { styled } from "@mui/system"
import WonderverseForm from "./WonderverseForm"
import WonderverseDetails from "./WonderverseDetails"

const StyledPopup = styled(Popup)(({ theme }) => ({
    cursor: "default",

    ".mapboxgl-popup-close-button": {
        position: "absolute",
        top: "5px",
        right: "5px",
        background: "transparent",
        color: theme.palette.primary.main,
        fontSize: "25px"
    }
}))

const PostOrBid: React.FC<PostOrBidProps> = ({ info, setPopupInfo, allowance, tokenBalance, baseInfo, mintPrice }) => {
    const [showForm, setShowForm] = useState(false)

    let comp = <WonderverseForm info={info} setPopupInfo={setPopupInfo} allowance={allowance} tokenBalance={tokenBalance} baseInfo={baseInfo} setShowForm={setShowForm} />

    if (info && info.ipfsHash) {
        if (showForm) {
            comp = <WonderverseForm info={info} setPopupInfo={setPopupInfo} allowance={allowance} tokenBalance={tokenBalance} baseInfo={baseInfo} setShowForm={setShowForm} />
        } else {
            comp = <WonderverseDetails info={info} baseInfo={baseInfo} setShowForm={setShowForm} setPopupInfo={setPopupInfo} mintPrice={mintPrice} />
        }
    }

    return (
        <div>
            {
                info && <StyledPopup
                    tipSize={10}
                    anchor="top"
                    longitude={info.longitude}
                    latitude={info.latitude}
                    closeOnClick={false}
                    onClose={() => {
                        setPopupInfo(null)
                        setShowForm(false)
                    }}
                >
                    {comp}
                </StyledPopup>
            }
        </div>

    )
}

export default React.memo(PostOrBid)