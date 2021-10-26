import { styled } from "@mui/system";
import { Select } from "@mui/material";
import { Box } from "@mui/system";

export const StyledSelect = styled(Select)<{ bgcolor?: string, textcolor?: string }>(({ theme, bgcolor, textcolor }) => ({
    height: "48px",
    fontSize: "14px",
    width: "100%",
    backgroundColor: `${bgcolor ? bgcolor : "#c241b4"}`,
    color: `${textcolor ? textcolor : "#ffffff"}`,
}))

export const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: "0 10px",
}))
