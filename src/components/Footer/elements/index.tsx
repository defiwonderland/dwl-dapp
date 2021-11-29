import { styled } from "@mui/system";
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from "react-router-dom";

export const FooterContainer = styled('div')(({ theme }) => ({
    background: "#032621",
    borderRadius: "10px",
    padding: "80px 40px 80px",
    width: "70%",
    height: "auto",

    [theme.breakpoints.down("md")]: {
        padding: "60px 20px 40px",
        width: "100%",
    },
}))

export const LogoImg = styled('img')(({ theme }) => ({
    width: "100%",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
        width: "80%",
        height: "80%",
    },
}))

export const ImgContainer = styled('a')({
    display: "flex",
    fontSize: "1.25rem",
    alignItems: "center",
    justifyContent: "flex-start"
})

export const FooterLink = styled(NavLink)({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#fff",
    padding: "10px 0",
    width: "100%",
    textDecoration: "none",
})

export const FooterExternal = styled('a')({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    color: "#fff",
    padding: "10px 0",
    width: "100%",
    textDecoration: "none",
})

export const FooterLinkItems = styled('li')(({ theme }) => ({
    listStyle: "none",
    margin: "10px 0",
    fontSize: "14px",

    "::after": {
        content: '""',
        width: "0",
        display: "block",
        height: "2px",
        transition: ".3s ease",
        borderBottom: `2px solid ${theme.palette.primary.main}`,
    },

    ":hover::after": {
        width: "100%",
    }
}))

export const StyledListItemButton = styled(ListItemButton)({
    fontSize: "14px"
})

export const SocialWrap = styled('div')({
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#45EDD5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    margin: "0 5px",

    "svg": {
        width: "16px",
        height: "16px",
    },

    ":hover": {
        backgroundColor: "#113945",

        "svg": {
            color: "#ffffff",
        }
    }
})

export const SocialLink = styled('a')({
    textDecoration: "none",
    width: "16px",
    height: "16px",
})