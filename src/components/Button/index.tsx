import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { IconButton } from "@mui/material";

export const PrimaryButton = styled(Button)<{ width?: string, minheight?: string }>(({ theme, width, minheight }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    padding: "6px 12px",
    textTransform: "none",
    fontSize: "16px",
    width: `${width ? width : "100%"}`,
    minHeight: `${minheight ? minheight : "50px"}`,
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    border: `2px solid ${theme.palette.primary.main}`,

    '&:hover': {
        backgroundColor: theme.palette.primary.main,
    },

    ":disabled": {
        backgroundColor: "#FFBEF7",
        color: "#ffffff",
        border: "none",
    },

    [theme.breakpoints.down("sm")]: {
        minWidth: "130px",
        fontSize: "13px",
        padding: "5px 10px",
        margin: "0px"
    },
}))


export const ErrorButton = styled(PrimaryButton)<{ width?: string }>(({ theme, width }) => ({
    backgroundColor: theme.palette.error.main,
    width: `${width ? width : "100%"}`,
    border: `2px solid ${theme.palette.error.main}`,

    "svg": {
        width: "30px",
        height: "30px",
        color: "#ffffff"
    },

    '&:hover': {
        backgroundColor: theme.palette.error.main,
    },

    ":disabled": {
        backgroundColor: "#f598a1",
    },
}))

export const VariantButton = styled(Button)<{ width?: string, minheight?: string }>(({ theme, width, minheight }) => ({
    color: theme.palette.text.primary,
    padding: "6px 12px",
    textTransform: "none",
    fontSize: "16px",
    width: `${width ? width : "100%"}`,
    margin: "0 10px",
    minHeight: `${minheight ? minheight : "50px"}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    border: `2px solid ${theme.palette.primary.main}`,

    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        transition: "all 0.3s ease-in-out"
    },

    [theme.breakpoints.down("sm")]: {
        minWidth: "130px",
        fontSize: "13px",
        padding: "5px 10px",
        margin: "0px"
    },
}))

export const ExpandButton = styled(Button)(({ theme }) => ({
    border: "none",
    textdDecoration: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    color: "#000000",
    textTransform: "none",
    padding: "6px 12px",
}))

export const StyledIconButton = styled(IconButton)<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
    backgroundColor: bgcolor,
    height: "48px",
    width: "48px",
    borderRadius: "4px",

    "svg": {
        color: "#ffffff",
        width: "18px",
        height: "18px"
    },

    ":hover": {
        backgroundColor: bgcolor,
    }
}))
