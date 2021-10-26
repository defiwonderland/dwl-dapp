import { styled } from "@mui/system";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledTabs = styled(Tabs)<{ bgcolor?: string, smbgcolor?: string }>(({ theme, smbgcolor, bgcolor }) => ({
    width: "100%",
    backgroundColor: `${bgcolor ? bgcolor : theme.palette.primary.main}`,

    [theme.breakpoints.down("sm")]: {
        backgroundColor: smbgcolor,
    },
}))

export const StyledTab = styled(Tab)<{ selectedcolor?: string, fontSize?: string, textcolor?: string, border?: string }>(({ theme, selectedcolor, fontSize, textcolor, border }) => ({
    borderBottom: "none",
    fontSize: `${fontSize ? fontSize : "16px"}`,
    color: `${textcolor ? textcolor : "#ffffff"}`,
    textTransform: "none",
    border: `${border ? border : "none"}`,

    "&.Mui-selected": {
        backgroundColor: `${selectedcolor ? selectedcolor : "#032621"} `,
        color: "#ffffff",
        borderBottom: "none"
    },

    [theme.breakpoints.down("sm")]: {
        fontSize: "14px"
    },
}))
