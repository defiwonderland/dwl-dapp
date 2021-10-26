import React from "react"
import Box from '@mui/material/Box';
import { StyledH3, StyledText } from "../../../components/Text";
import { StyledBox } from "./elements"

interface IntroProps {
    iconImg: React.SVGProps<SVGSVGElement>,
    introTitle: string,
    introDesc: string
}

const Intro: React.FC<IntroProps> = ({ iconImg, introTitle, introDesc }) => {
    return (
        <Box>
            <StyledBox>
                {iconImg}
                <StyledH3>{introTitle}</StyledH3>
            </StyledBox>

            <StyledText>{introDesc}</StyledText>
        </Box>
    )
}

export default Intro
