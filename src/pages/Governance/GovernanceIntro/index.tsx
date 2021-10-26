import React from "react"
import { Box } from "@mui/system"
import Intro from "./Intro"
import { Grid } from "@mui/material"
import { ImInfo } from "react-icons/im"
import { FaRegQuestionCircle } from "react-icons/fa"
import { IconContainer } from "./elements"

const icon1 = <IconContainer>
    <ImInfo />
</IconContainer>
const icon2 = <IconContainer>
    <FaRegQuestionCircle />
</IconContainer >
const title1 = "What is Governance"
const title2 = "How it Works"
const desc1 = "Lorem ipsum dolor sit amet, pro primis nostro eloquentiam ei, et vix petentium eloquentiam. An mea libris scribentur. Te mei dolores torquatos mnesarchum, labore dignissim mnesarchu"
const desc2 = "Lorem ipsum dolor sit amet, pro primis nostro eloquentiam ei, et vix petentium eloquentiam. An mea libris scribentur. Te mei dolores torquatos mnesarchum, labore dignissim mnesarchu"

const GovernanceInto = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid container item sm={12} md={6} alignItems="center">
                    <Intro
                        iconImg={icon1}
                        introTitle={title1}
                        introDesc={desc1}
                    />
                </Grid>

                <Grid container item sm={12} md={6} alignItems="center">
                    <Intro
                        iconImg={icon2}
                        introTitle={title2}
                        introDesc={desc2}
                    />
                </Grid>
            </Grid>

        </Box>
    )
}

export default GovernanceInto