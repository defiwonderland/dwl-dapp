import { styled } from "@mui/system";

export const CollapseContainer = styled('div')({
    background: "#032621",
    padding: "12px",
    borderRadius: "7px",
    color: "#ffffff"
})

export const StakeContainer = styled('div')(({ theme }) => ({
    backgroundColor: "transparent",
    borderRadius: "6px",
    padding: "10px",
    height: "auto",
    boxShadow: "0 0.125rem 0.25rem rgb(0 0 0 / 8%)",
    width: "50%",
    boxSizing: "border-box",
    border: "1px solid #ffffff",

    [theme.breakpoints.down("md")]: {
        width: "80%"
    },
}))