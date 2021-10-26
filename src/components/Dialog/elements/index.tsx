import { styled } from "@mui/system"
import { IconButton } from "@mui/material"
import { PrimaryButton } from "../../Button"
import { Input } from "@mui/material"

export const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: "1.2rem",
    right: "1.5rem",
    fontSsize: "2rem",
    background: "transparent",
    color: theme.palette.primary.main,
}))

export const MaxButton = styled(PrimaryButton)(({ theme }) => ({
    width: "25px",
    minHeight: "20px",
    marginLeft: "5px",

    [theme.breakpoints.down("sm")]: {
        minWidth: "50px",
    }
}))

export const InputContainer = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "4px",
    padding: "5px",
    height: "40px",

    [theme.breakpoints.down("sm")]: {
        height: "35px"
    }
}))

export const StakeInput = styled(Input)(({ theme }) => ({
    height: "30px",
    fontSize: "14px",
    minWidth: "275px",
    maxWidth: "300px",
    padding: "5px",
    border: "none",
    outline: "none",

    [theme.breakpoints.down("sm")]: {
        minWidth: "175px",
        maxWidth: "200px"
    }
}))