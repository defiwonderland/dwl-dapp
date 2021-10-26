import { styled } from "@mui/system";
import { Button, MenuItem, Menu, Popper } from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledDropdownButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    padding: "8px",
    textTransform: 'none',
    width: "100%",

    ":hover": {
        backgroundColor: "transparent"
    },

    [theme.breakpoints.down("md")]: {
        fontSize: "15px",
        color: "#ffffff",
        padding: "0px",
    },
}))

export const StyledPopper = styled(Popper)(({ theme }) => ({
    zIndex: 999,

    "& .MuiPaper-root": {
        backgroundColor: "#ffffff",
    },

    [theme.breakpoints.down("md")]: {
        width: "80%",
    },
}))

export const StyledDropdownMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.text.primary,
    padding: "0.35rem 1.5rem",
    fontWeight: 400,
    backgroundColor: "transparent",
    fontSize: "15px",

    [theme.breakpoints.down("md")]: {
        backgroundColor: "#ffffff",
        padding: "20px 40px",

        ":hover": {
            backgroundColor: "#ffffff"
        },
    },
}))

export const StyledSidebarMenu = styled(Menu)(({ theme }) => ({
    position: "absolute",
    top: "10px",

    "& .MuiPaper-root": {
        backgroundColor: theme.palette.text.primary,
        boxShadow: "none",
        width: "100%",
        color: "#ffffff",
    },

    [theme.breakpoints.up("md")]: {
        display: "none",
    },
}))

export const StyledSidebarMenuItem = styled(MenuItem)({
    padding: "20px 40px",
    fontSize: "15px",
    display: "flex",
    alignItems: "flex-start",
})

export const SidebarLinks = styled(NavLink)(() => ({
    color: "#ffffff",
    cursor: "pointer",
    textDecoration: "none"
}))

