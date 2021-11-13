import React from "react"
import { PopupLayout, TwitterLink } from "./Elements"
import { FormProps } from "./types"
import { Box } from "@mui/system"
import { CardTitle, CardText } from "../../../components/Card/elements"
import truncateWalletAddress from "../../../utils/truncateWalletAddress"
import { getAddressOnScan } from "../../../utils/getChainInfo"
import { LinkEnternal } from "../../../components/Link"
import { FaTwitter } from "react-icons/fa"
import useActiveWeb3React from "../../../hooks/useActiveWeb3React"
import UnlockButton from "../../../components/UnlockButton"
import { PrimaryButton } from "../../../components/Button"

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const WonderverseDetails: React.FC<FormProps> = ({ info, baseInfo, setShowForm }) => {
    const { ipfsHash, desc, bidLevel, owner, twitter, city } = info;
    const basePrice = baseInfo && baseInfo.basePrice
    const { account } = useActiveWeb3React()

    const bid = () => {
        setShowForm(true)
    }

    return (
        <PopupLayout>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <img src={`https://ipfs.infura.io/ipfs/${ipfsHash}`} alt="city" width={150} />

                <Box sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "10px"
                }}>
                    <Box sx={{
                        maxWidth: "200px",
                        margin: "5px 0"
                    }}>
                        <CardTitle>{desc}</CardTitle>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">City:</CardText>
                        <CardText fontWeight={400} mt="5px" mb="5px">{city}</CardText>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">Owner:</CardText>
                        <LinkEnternal href={getAddressOnScan(chainId, owner)} text={truncateWalletAddress(String(owner))} margin="5px 0" />
                    </Box>

                    {
                        twitter && <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">Twitter:</CardText>

                            <TwitterLink href={`https://twitter.com/${twitter}`} target="_blank">
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <FaTwitter style={{ color: "#0092e9", width: "18px", height: "18px" }} />
                                    <CardText fontWeight={400} mt="5px" mb="5px" ml="5px">@{twitter}</CardText>
                                </Box>
                            </TwitterLink>
                        </Box>
                    }

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">Bid Level:</CardText>
                        <CardText fontWeight={400} mt="5px" mb="5px">Level {bidLevel?.toString()}</CardText>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">Bid Price:</CardText>
                        <CardText fontWeight={400} mt="5px" mb="5px">{Number(basePrice) * Number(bidLevel) || 0} WNDR</CardText>
                    </Box>

                    {
                        account ? <PrimaryButton width="100px" minheight="30px" onClick={bid}>Bid</PrimaryButton> : <UnlockButton isVariant={false} />
                    }
                </Box>

            </Box>
        </PopupLayout>
    )
}

export default WonderverseDetails