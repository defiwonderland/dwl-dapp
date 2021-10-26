import { styled } from "@mui/system";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

export const SnackbarContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    minWidth: "330px",
    height: "60px",
    maxWidth: "360px",
    background: "#ffffff",
    boxShadow: "0 1rem 3rem rgb(0 0 0 / 18%)",
}))

export const IconContainer = styled("div")<{ color: string }>(({ color }) => ({
    width: "25px",
    height: "25px",

    "svg": {
        width: "25px",
        height: "25px",
        color: color,
    }
}))

export const CloseButton = styled(IconButton)(({ theme }) => ({
    background: "transparent",
    color: theme.palette.primary.main,
}))