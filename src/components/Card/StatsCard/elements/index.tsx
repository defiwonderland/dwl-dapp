import { styled } from "@mui/system";

export const StyledStatsCard = styled('div')<{ bgimg: string }>(({ theme, bgimg }) => ({
    backgroundImage: `url(${bgimg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "88% 100%",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "6px",
    minHeight: "130px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "60%",
    boxShadow: "0 1rem 3rem rgb(0 0 0 / 18%)",
    margin: "5px 0",

    [theme.breakpoints.down("md")]: {
        width: "100%"
    },
}))

export const CardText = styled('a')(({ color }) => ({
    color: color,
    fontSize: "16px",
    fontWeight: 600,
}))
