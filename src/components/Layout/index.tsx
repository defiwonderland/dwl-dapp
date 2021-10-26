import { styled } from "@mui/system";
import headerBg from "../../assets/images/farms/inner-header.png"

export const Wrapper = styled('div')(({ theme }) => ({
    padding: "80px 60px",
    margin: "0 auto",

    [theme.breakpoints.down("md")]: {
        padding: "40px 30px",
    },
}))

export const WidthWrapper = styled('div')(({ theme }) => ({
    width: "80%",
    display: "block",
    margin: "0 auto",

    [theme.breakpoints.down("lg")]: {
        width: "100%",
    },
}))

export const FooterWrapper = styled('div')(({ theme }) => ({
    paddingBottom: "30px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
}))

export const TextContainer = styled('div')(({ theme }) => ({
    width: "50%",

    [theme.breakpoints.down("md")]: {
        width: "90%",
    },
}))

export const CenterConatiner = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "start",

    [theme.breakpoints.down("md")]: {
        justifyContent: "center",
    },
}))

export const Spacing = styled('div')(({ theme }) => ({
    margin: "24px 0",

    [theme.breakpoints.down("md")]: {
        margin: "0px",
    },
}))

export const HeaderConatiner = styled("div")(({ theme }) => ({
    background: `url(${headerBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "215px",
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    alignItems: 'center',
    justifyContent: "center"
}))

export const OptionsContainer = styled('div')(() => ({
    minHeight: "74px",
    background: "#fc4ee7",
    display: "flex",
    alignItems: 'center',
    justifyContent: "center"
}))

