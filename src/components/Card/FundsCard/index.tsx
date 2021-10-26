import React from "react"
import { StyledBox, StyledTextBox } from "./elements"
import { StyledCard, CardTitle, CardText, CustomImg } from "../elements"
import { Box } from "@mui/system"
import AreaChart from "../../Chart/AreaChart"
import fundImg from "../../../assets/images/funds/fund.svg"
import { PrimaryButton } from "../../Button"
import { FaRegQuestionCircle } from "react-icons/fa"
import { FundCardProps } from "../types"

const FundsCard: React.FC<FundCardProps> = ({ direction, fund }) => {
    return (
        <StyledCard style={{ margin: "0px", width: "100%" }}>
            <StyledBox>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <CustomImg src={fundImg} />

                    <Box sx={{
                        marginLeft: "10px"
                    }}>
                        <CardTitle>{fund.title}</CardTitle>
                        <CardText fontWeight={400} mt="3px" mb="3px" >{fund.subtitle}</CardText>
                    </Box>
                </Box>

                <PrimaryButton width="120px" minheight="30px" style={{ maxHeight: "50px", margin: "5px 0" }}>{fund.buttonText}</PrimaryButton>
            </StyledBox>

            <StyledTextBox direction={String(direction)}>
                <CardText fontWeight={500} mt="5px" mb="5px">Value Managed: $881.9K</CardText>
                <StyledBox>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>

                        <CardText fontWeight={400} mt="5px" mb="5px" mr="5px">Lifetme Return:</CardText>
                        <FaRegQuestionCircle style={{ width: "15px", height: "15px" }} />
                        <CardText fontWeight={400} mt="5px" mb="5px" ml="5px" mr="5px" color="#28a745">{fund.return}</CardText>

                    </Box>

                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <CardText fontWeight={400} mt="5px" mb="5px" mr="5px">Risk Factor:</CardText>
                        <FaRegQuestionCircle style={{ width: "15px", height: "15px" }} />
                        <CardText fontWeight={400} mt="5px" mb="5px" ml="5px" color="#28a745">{fund.risk}</CardText>
                    </Box>
                </StyledBox>
            </StyledTextBox>

            <Box sx={{
                height: "150px"
            }}>
                <AreaChart />
            </Box>
        </StyledCard>
    )
}

export default FundsCard