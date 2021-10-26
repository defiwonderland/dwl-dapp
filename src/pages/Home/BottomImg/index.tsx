import bottomImg from "../../../assets/images/home/mouse-running.png"
import { StyledImgContent } from "../HomeElements"
import Box from '@mui/material/Box';

function BottomImg() {
    return (
        < Box sx={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "center"
        }
        }>
            <StyledImgContent src={bottomImg} />
        </Box>
    )
}

export default BottomImg
