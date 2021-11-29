import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { MenuConfig } from '../../../config/types';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import { MdArrowDropDown } from "react-icons/md"
import { StyledDropdownButton, StyledDropdownMenuItem, StyledPopper } from '../elements/Dropdown';
import { NavLinks, NavHref } from '../elements/Toolbar';

interface DropdownMenuProps {
    title: string
    menus: MenuConfig[]
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, menus }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <StyledDropdownButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                endIcon={<MdArrowDropDown />}
            >
                {title}
            </StyledDropdownButton>

            <StyledPopper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {
                                        menus.map((menu, index) => {
                                            if (menu.link.startsWith("/")) {
                                                return (
                                                    <NavLinks key={index} to={menu.link}>
                                                        <StyledDropdownMenuItem
                                                            onClick={handleClose}
                                                        >
                                                            {menu.item}
                                                        </StyledDropdownMenuItem>
                                                    </NavLinks>
                                                )
                                            } else {
                                                return (
                                                    <NavHref href={menu.link} target={"_blank"}>
                                                        <StyledDropdownMenuItem
                                                            onClick={handleClose}
                                                        >
                                                            {menu.item}
                                                        </StyledDropdownMenuItem>
                                                    </NavHref>
                                                )
                                            }
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </StyledPopper>
        </div>
    );
}

export default DropdownMenu