import { styled } from "@mui/system";

export const FarmImg = styled('img')({
    width: "50px",
    height: "100%",
    margin: "0 5px"
})

export const TagImg = styled('img')({
    width: "20pxs",
    height: "20px",
    margin: "0 5px"
})

export const FarmTag = styled('div')(({ theme }) => ({
    background: "#032621",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FFFFFF",
    minWidth: "50px",
    textAlign: "center",
    padding: "3px 0",
    marginLeft: "10px",

    [theme.breakpoints.down("md")]: {
        fontSize: "14px"
    },
}))


