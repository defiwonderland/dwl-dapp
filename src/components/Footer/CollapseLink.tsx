import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/system';
import Collapse from '@mui/material/Collapse';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { StyledH5 } from '../Text';
import { FooterLink, StyledListItemButton, FooterExternal } from './elements';
import { CollapseLinkProps } from "./types"

const CollapseLink: React.FC<CollapseLinkProps> = ({ title, content }) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick}>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    color: "#ffffff"
                }}>
                    <StyledH5>{title}</StyledH5>
                    {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </Box>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        content.map((item) => {
                            if (item.link.startsWith("/")) {
                                return (
                                    <StyledListItemButton key={item.id}>
                                        <FooterLink to={item.link}>{item.text}</FooterLink>
                                    </StyledListItemButton>
                                )
                            } else {
                                return (
                                    <StyledListItemButton key={item.id}>
                                        <FooterExternal href={item.link} target="_blank">{item.text}</FooterExternal>
                                    </StyledListItemButton>
                                )
                            }
                        })

                    }
                </List>
            </Collapse>
        </List >
    );
}

export default CollapseLink