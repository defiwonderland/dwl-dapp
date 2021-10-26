import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io"
import { IconContainer, IconText } from "../elements"
import { DirectionIconCardProps } from "../types"
import { Box } from "@mui/system"

const DirectionIcon: React.FC<DirectionIconCardProps> = ({ isup, text }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
        }}>
            <IconContainer isup={String(isup)}>
                {isup ? <IoMdArrowDropupCircle /> : <IoMdArrowDropdownCircle />}
            </IconContainer>
            <IconText isup={String(isup)}>{text}</IconText>
        </Box>
    )
}

export default DirectionIcon