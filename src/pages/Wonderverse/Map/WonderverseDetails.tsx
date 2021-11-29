import React from "react"
import { PopupLayout, TwitterLink } from "./Elements"
import md5 from "md5"
import { create } from 'ipfs-http-client'
import { FormProps } from "./types"
import { Box } from "@mui/system"
import { CardTitle, CardText } from "../../../components/Card/elements"
import truncateWalletAddress from "../../../utils/truncateWalletAddress"
import { getAddressOnScan } from "../../../utils/getChainInfo"
import { LinkEnternal } from "../../../components/Link"
import { FaTwitter } from "react-icons/fa"
import useActiveWeb3React from "../../../hooks/useActiveWeb3React"
import UnlockButton from "../../../components/UnlockButton"
import { PrimaryButton, VariantButton } from "../../../components/Button"
import { useWonderVerseCollectionContract } from "../../../hooks/useContract"
import {
    useSnackbarState,
    useLoadingState,
    useErrorState,
    useTransactionHash,
    useSuccessState
} from "../../../state/snackbar/hooks"

const chainId = Number(process.env.REACT_APP_CHAIN_ID)
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export interface Trait {
    attributes: Attribute[];
    image: string;
    description: string;
    name: string;
    id?: string;
}

interface Attribute {
    trait_type: string;
    value: string;
}

const WonderverseDetails: React.FC<FormProps> = ({ info, baseInfo, setShowForm, mintPrice, setPopupInfo }) => {
    const { id, ipfsHash, desc, bidLevel, owner, twitter, city } = info;
    const basePrice = baseInfo && baseInfo.basePrice
    const { account } = useActiveWeb3React()
    const setOpenSnackbar = useSnackbarState()[1]
    const setLoadingState = useLoadingState()[1]
    const setSuccessState = useSuccessState()[1]
    const setTransactionHash = useTransactionHash()[1]
    const setErrorState = useErrorState()[1]
    const isQualified = account === owner
    const wonderVerseCollectionContract = useWonderVerseCollectionContract(true)

    const bid = () => {
        setShowForm(true)
    }

    const generateNFT = async () => {
        const string = ipfsHash + city + owner + bidLevel
        const uniqueIdentifier = md5(string).slice(0, 7)
        setLoadingState({ loading: true, loadingMessage: "Uploading info to ipfs..." })
        setSuccessState({ success: false, successMessage: "" })
        setErrorState({ error: false, errorMessage: "" })
        setOpenSnackbar(true)
        setTransactionHash("")

        const trait: Trait = {
            attributes: [
                {
                    trait_type: "Level",
                    value: String(bidLevel)
                },
                {
                    trait_type: "City",
                    value: city
                },
                {
                    trait_type: "Purchased Price",
                    value: `${basePrice * bidLevel / 2} WNDR`
                }
            ],
            image: `https://ipfs.infura.io/ipfs/${ipfsHash}`,
            description: desc,
            name: `WonderVerse NFT #${uniqueIdentifier}`
        }

        try {
            const response = await ipfs.add(Buffer.from(JSON.stringify(trait))) as any;

            if (response) {
                const hash = response.path
                setLoadingState({ loading: true, loadingMessage: "WonderVerse NFT Generating..." })
                const tokenURI = `https://ipfs.infura.io/ipfs/${hash}`
                const boardId = Number(id.toString())
                const formatMintPrice = Number(mintPrice).toString()

                try {
                    const result = await wonderVerseCollectionContract.mint(boardId, tokenURI, { value: formatMintPrice })

                    if (result) {
                        setTransactionHash(result.hash)
                        setLoadingState({ loading: false, loadingMessage: "" })
                        setSuccessState({ success: true, successMessage: `Congrats! You have generated the WonderVerse NFT in ${city}` })
                        setPopupInfo(null)
                        setShowForm(false)
                    }
                } catch (err) {
                    console.log(">>>>>>>", err)
                    setLoadingState({ loading: false, loadingMessage: "" })
                    setErrorState({ error: true, errorMessage: `Oops! Failed to generate the NFT in ${city}. Please try again.` })
                    setPopupInfo(null)
                    setShowForm(false)
                }
            } else {
                setLoadingState({ loading: false, loadingMessage: "" })
                setErrorState({ error: true, errorMessage: "Oops! Failed to upload info. Please try again." })
                setPopupInfo(null)
                setShowForm(false)
            }
        } catch (err) {
            console.error("Unable to mint wonder verse nft", err)
        }
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
                        <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">Bid Level: </CardText>
                        <CardText fontWeight={400} mt="5px" mb="5px">Level {bidLevel?.toString()}</CardText>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CardText fontWeight={500} mt="5px" mb="5px" mr="5px">Bid Price: </CardText>
                        <CardText fontWeight={400} mt="5px" mb="5px">{Number(basePrice) * Number(bidLevel) || 0} WNDR</CardText>
                    </Box>

                    {
                        account
                            ? <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <PrimaryButton width="100px" minheight="30px" onClick={bid}>Bid</PrimaryButton>
                                <VariantButton width="150px" minheight="30px" disabled={!isQualified} onClick={generateNFT}>Generate NFT</VariantButton>
                            </Box>

                            : <UnlockButton isVariant={false} />
                    }
                </Box>

            </Box>
        </PopupLayout>
    )
}

export default WonderverseDetails