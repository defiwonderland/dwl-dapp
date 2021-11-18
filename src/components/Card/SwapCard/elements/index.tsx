import { styled } from "@mui/system";
import { Box } from "@mui/system";
import { Input } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    margin: "0 auto",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down('lg')]: {
        width: "70%"
    },

    [theme.breakpoints.down('md')]: {
        width: "80%"
    },

    [theme.breakpoints.down('sm')]: {
        width: "100%"
    },
}))

export const InputContainer = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    padding: "5px",
    height: "40px",
    width: "70%",
    backgroundColor: "#23423e",
    marginLeft: "20px",

    [theme.breakpoints.down("sm")]: {
        height: "35px",
        marginLeft: "10px",
    }
}))

export const TradeInput = styled(Input)(({ theme }) => ({
    height: "30px",
    fontSize: "14px",
    padding: "10px",
    width: "100%",
    border: "none",
    outline: "none",
    color: "#ffffff"
}))