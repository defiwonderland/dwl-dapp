import { styled } from "@mui/system";
import { StyledText } from "../../../Text";

export const SmallText = styled(StyledText)(({ theme }) => ({
    fontSize: "10px",
    marginBottom: "5px",
    color: "#ffffff",

    [theme.breakpoints.down("md")]: {
        fontSize: "10px",
        marginBottom: "5px",
    }
}))

export const StakeTokenBox = styled('div')({
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fed2f8"
})