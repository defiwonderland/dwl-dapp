import React from "react";
import { StyledCard, CardTitle, CardText, CustomImg } from "../elements";
import { Box } from "@mui/system";
import { PrimaryButton } from "../../Button";
import { StyledBox } from "../FundsCard/elements";
import Rating from '@mui/material/Rating';
import { styled } from "@mui/system";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import { FiMessageCircle } from "react-icons/fi"
import { PublicPostConfig } from "../../../config/types";

interface PublicPostCardProps {
    post: PublicPostConfig
}

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconFilled': {
        color: theme.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
        color: '#FFBEF7',
    },
}))

const PublicPostCard: React.FC<PublicPostCardProps> = ({ post }) => {
    return (
        <>
            <StyledCard style={{ margin: "0px", width: "100%", padding: "0px" }}>
                <Box sx={{ padding: "15px" }}>
                    <StyledBox sx={{
                        marginBottom: "10px",
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "10px",
                        }}>
                            <CustomImg src={post.img} />
                            <Box sx={{
                                marginLeft: "10px"
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "start",
                                }}>
                                    <CardTitle style={{ marginRight: "5px", width: "auto" }}>{post.title}</CardTitle>
                                    <CustomImg src={post.smImg} width="14px" height="14px" />
                                </Box>

                                <CardText fontWeight={400} mt="3px" mb="0px" >$881.9K Value-8%</CardText>
                            </Box>
                        </Box>

                        <PrimaryButton width="120px" minheight="30px" style={{ maxHeight: "50px", margin: "5px 0" }}>View Pool</PrimaryButton>
                    </StyledBox>

                    <CardText style={{ fontSize: "16px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiod tempor incididunt ut labore et do</CardText>
                </Box>

                <Box sx={{
                    background: "#eeeeee",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "20px"
                        }}>
                            <StyledRating
                                defaultValue={1}
                                max={1}
                                getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                icon={<MdFavorite fontSize="inherit" />}
                                emptyIcon={<MdFavoriteBorder fontSize="inherit" />}
                            />

                            <CardText mt="0px" mb="0px" ml="5px">2</CardText>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <FiMessageCircle style={{ width: "24px", height: "24px" }} />

                            <CardText mt="0px" mb="0px" ml="5px">Reply</CardText>
                        </Box>
                    </Box>

                    <CardText mt="0px" mb="0px" ml="5px">2 hrs ago</CardText>
                </Box>
            </StyledCard>
        </>
    )
}

export default PublicPostCard