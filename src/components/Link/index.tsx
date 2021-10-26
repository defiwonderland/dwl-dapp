import { styled } from "@mui/system";
import { LinkProps } from "./types";
import { FiExternalLink } from "react-icons/fi"

const LinkItems = styled('a')<{ color?: string, margin?: string }>(({ theme, color, margin }) => ({
    color: `${color ? color : theme.palette.primary.main}`,
    margin: `${margin ? margin : "10px 0"}`,
    width: "100%",
    fontSize: "14px",
    textDecoration: "none",
    display: 'flex',
    alignItems: "center",
    justifyContent: "start",

    "svg": {
        color: `${color ? color : theme.palette.primary.main}`,
        width: "16px",
        height: "16px",
        margin: "5px",
    }
}))

export const LinkEnternal: React.FC<LinkProps> = ({ href, text, color, margin }) => {
    return (
        <LinkItems href={href} target="_blank" color={color} margin={margin}>
            <span>{text}</span>
            <FiExternalLink />
        </LinkItems>
    )

}