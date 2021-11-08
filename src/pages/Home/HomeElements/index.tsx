import { styled } from "@mui/system";
import bg from "../../../assets/images/home/wndr-bg.png"

export const StyledImgContent = styled("img")(({ theme }) => ({
    maxWidth: "75%",
    height: "auto",

    [theme.breakpoints.between("md", "lg")]: {
        maxWidth: "95%",
    },

    [theme.breakpoints.down("md")]: {
        maxWidth: "100%",
    },
}))

export const CommunityContainer = styled('div')(({ theme }) => ({
    background: "#032621",
    borderRadius: "10px",
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "auto",
    width: "75%",
    padding: "80px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
        padding: "40px 20px",
        width: "100%",
    },
}))