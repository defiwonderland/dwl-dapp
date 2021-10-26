import { styled } from "@mui/system";
import { StyledH3, StyledText } from "../Text";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledIconButton } from "../Button";
import TableCell from '@mui/material/TableCell';

export const StyledCard = styled('div')<{ bgcolor?: string }>(({ theme, bgcolor }) => ({
    backgroundColor: `${bgcolor ? bgcolor : "#ffffff"}`,
    borderRadius: "6px",
    padding: "15px",
    height: "auto",
    boxShadow: "0 0.125rem 0.25rem rgb(0 0 0 / 8%)",
    maxWidth: "100%",
    minWidth: "95%",
    margin: "0 auto",
    boxSizing: "border-box",
    borderColor: "#ffffff",
}))

export const CardTitle = styled(StyledH3)(({ theme }) => ({
    fontSize: "16px",
    width: "100%",

    [theme.breakpoints.down("md")]: {
        fontSize: "14px"
    },
}))

export const CardText = styled(StyledText)<{ mr?: string, mt?: string, mb?: string, ml?: string, fontWeight?: number, color?: string }>(({ theme, fontWeight, mr, mt, mb, ml, color }) => ({
    fontSize: "14px",
    fontWeight: fontWeight,
    marginRight: mr,
    marginTop: mt,
    marginLeft: ml,
    marginBottom: mb,
    textAlign: "left",
    color: color,

    [theme.breakpoints.down("md")]: {
        fontSize: "14px",
        textAlign: "left",
    },
}))

export const Divider = styled('div')({
    borderBottom: "2px dashed #E0E0E0",
    marginBottom: "20px"
})


export const StyledTableContainer = styled(TableContainer)({
    boxShadow: "none"
})

export const StyledTableHead = styled(TableHead)({
    textTransform: "uppercase",
    color: "#687d7a",
})

export const StyledTableCell = styled(TableCell)({
    borderBottom: "none",
})


export const StyledTableRow = styled(TableRow)({
    cursor: "pointer",

    '&:nth-of-type(odd)': {
        backgroundColor: "#e9fffc",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#ffffff",
    },
})

export const CustomImg = styled('img')<{ width?: string, height?: string }>(({ width, height }) => ({
    width: `${width ? width : "50px"}`,
    height: `${height ? height : "50px"}`,
}))

export const IconContainer = styled('div')<{ isup: string }>(({ theme, isup }) => ({
    width: "30px",
    height: "30px",
    color: `${JSON.parse(isup) ? theme.palette.success.main : theme.palette.error.main}`,
    fontSize: "14px",

    "svg": {
        width: "30px",
        height: "30px",
        color: `${JSON.parse(isup) ? theme.palette.success.main : theme.palette.error.main}`,
    },
}))

export const IconText = styled(StyledText)<{ isup: string }>(({ theme, isup }) => ({
    fontSize: "14px",
    marginLeft: "5px",
    marginBottom: "0px",
    marginTop: "0px",
    color: `${JSON.parse(isup) ? theme.palette.success.main : theme.palette.error.main}`,

    [theme.breakpoints.down("md")]: {
        fontSize: "14px",
        marginLeft: "5px",
        color: `${JSON.parse(isup) ? theme.palette.success.main : theme.palette.error.main}`,
    }
}))


export const NormalText = styled(StyledText)(({ theme }) => ({
    fontSize: "13px",
    marginBottom: "5px",
    color: "#ffffff",
    fontWeight: 600,

    [theme.breakpoints.down("md")]: {
        fontSize: "13px",
        marginBottom: "5px",
    }
}))

export const StakeButton = styled(StyledIconButton)<{ color?: string }>(({ theme, color }) => ({
    color: `${color ? color : theme.palette.text.primary}`,
    fontSize: "16px",
    border: `2px solid ${theme.palette.primary.main}`,
    margin: "0 5px",

    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "#ffffff",
        transition: "all 0.3s ease-in-out"
    },

    ":disabled": {
        color: `${color ? color : theme.palette.text.primary}`
    }
}))