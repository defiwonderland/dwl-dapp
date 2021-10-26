import { styled } from "@mui/system";

export const StyledH1 = styled('h1')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "54px",
    fontWeight: 900,
    textAlign: "left",
    margin: "20px 0",

    [theme.breakpoints.down("md")]: {
        fontSize: "40px",
        textAlign: "center",
    },
}))

export const StyledH2 = styled('h2')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "34px",
    fontWeight: 800,
    textAlign: "left",
    margin: "20px 0",

    [theme.breakpoints.down("md")]: {
        fontSize: "28px",
        textAlign: "center",
    },
}))

export const StyledH3 = styled('h3')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: "20px",
    fontWeight: 700,
    textAlign: "left",

    [theme.breakpoints.down("md")]: {
        fontSize: "16px",
    },
}))

export const StyledH5 = styled('h5')(({ theme }) => ({
    color: "#FFFFFF",
    fontWeight: 500,
    fontSize: "16px",
    opacity: 0.5,
    marginBottom: "8px",
}))

export const StyledText = styled('p')<{ color?: string }>(({ theme, color }) => ({
    color: `${color ? color : theme.palette.text.primary}`,
    fontSize: "20px",
    fontWeight: 400,
    textAlign: "left",
    margin: "20px 0",
    lineHeight: "1.5",

    [theme.breakpoints.down("md")]: {
        textAlign: "center",
        fontSize: "16px",
    },
}))