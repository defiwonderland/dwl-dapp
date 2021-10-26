import { styled } from "@mui/system";
import Toolbar from '@mui/material/Toolbar';
import { AppBar } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { NavLink } from "react-router-dom";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-between",
    height: "70px",
    width: "75%",
    margin: "0 auto",

    [theme.breakpoints.between("lg", "xl")]: {
        width: "90%",
    },

    [theme.breakpoints.between("md", "lg")]: {
        width: "95%",
    },
}))

export const StyledAppBar = styled(AppBar)<{ scroll: string }>(({ scroll }) => ({
    background: `${JSON.parse(scroll) ? '#ffffff' : 'transparent'}`,
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1030,
    boxShadow: "none",
}))

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    [theme.breakpoints.up("md")]: {
        display: "none"
    },
}))

export const ImgContainer = styled('a')({
    display: "flex",
    fontSize: "1.25rem",
    alignItems: "center",
    justifyContent: "flex-start"
})

export const LogoImg = styled('img')(({ theme }) => ({
    width: "100%",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "80%",
    },
}))

export const NavMenu = styled('ul')(({ theme }) => ({
    display: "none",

    [theme.breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
        listStyle: "none",
        textAlign: "center"
    },
}))

export const NavItem = styled('li')(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    padding: "10px",
}))

export const NavLinks = styled(NavLink)(({ theme }) => ({
    color: theme.palette.text.secondary,
    cursor: "pointer",
    textDecoration: "none"
}))

export const WalletIcon = styled('img')({
    width: "30px",
    height: "30px",
    marginRight: "5px"
})