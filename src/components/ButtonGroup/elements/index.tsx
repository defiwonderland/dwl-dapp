import { styled } from "@mui/system";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)<{ bgcolor: string, focuscolor: string, padding?: string }>(({ theme, bgcolor, focuscolor, padding }) => ({
    backgroundColor: bgcolor,
    margin: "0 2px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "50px",
    color: "#ffffff",
    fontSize: "14px",
    flex: 1,
    textTransform: "none",
    padding: padding,

    ":hover": {
        backgroundColor: bgcolor
    },

    ":focus": {
        backgroundColor: focuscolor
    },
}))