import { styled } from "@mui/system";
import { Box } from "@mui/system";

export const StyledTextBox = styled(Box)<{ direction: string }>(({ theme, direction }) => ({
    display: "flex",
    alignItems: `${JSON.parse(direction) ? "center" : "start"}`,
    justifyContent: "space-between",
    flexDirection: `${JSON.parse(direction) ? "row" : "column"}`,
    margin: "10px 0",

    [theme.breakpoints.down('xl')]: {
        flexDirection: "column",
        alignItems: "start",
    },
}))

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0",

    [theme.breakpoints.down('lg')]: {
        flexDirection: "column",
        alignItems: "start",
    },
}))