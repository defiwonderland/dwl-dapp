import { styled } from "@mui/system";
import { Box } from "@mui/system";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    justifyContent: "start",

    [theme.breakpoints.down("md")]: {
        justifyContent: "center",
    }
}))

export const IconContainer = styled('div')(({ theme }) => ({
    width: "20px",
    height: "20px",
    marginRight: "10px",

    "svg": {
        width: "20px",
        height: "20px",
    },

    [theme.breakpoints.down("md")]: {
        width: "16px",
        height: "16px",
        marginRight: "10px",

        "svg": {
            width: "16px",
            height: "16px",
        },
    },
}))