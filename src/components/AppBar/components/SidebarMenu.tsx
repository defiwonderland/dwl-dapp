import React from "react"
import { HiMenuAlt4 } from "react-icons/hi"
import { StyledIconButton } from "../elements/Toolbar"
import { StyledSidebarMenu, StyledSidebarMenuItem, SidebarLinks } from "../elements/Dropdown";
import DropdownMenu from "./DropdownMenu";
import menus from "../../../config/constants/menus";

const SidebarMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <StyledIconButton
                size="large"
                aria-controls="basic-menu"
                edge="start"
                aria-label="menu"
                onClick={handleClick}
            >
                <HiMenuAlt4 />
            </StyledIconButton>

            <StyledSidebarMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <SidebarLinks to="/trade">
                    <StyledSidebarMenuItem onClick={handleClose}>Trade</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/funds">
                    <StyledSidebarMenuItem onClick={handleClose}>Hedge Funds</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/farms">
                    <StyledSidebarMenuItem onClick={handleClose}>Farms</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/pools">
                    <StyledSidebarMenuItem onClick={handleClose}>Pools</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/nfts">
                    <StyledSidebarMenuItem onClick={handleClose}>NFT's</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/wonderverse">
                    <StyledSidebarMenuItem onClick={handleClose}>Wonderverse</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/launchpad">
                    <StyledSidebarMenuItem onClick={handleClose}>Launchpad</StyledSidebarMenuItem>
                </SidebarLinks>

                <SidebarLinks to="/governance">
                    <StyledSidebarMenuItem onClick={handleClose}>Governance</StyledSidebarMenuItem>
                </SidebarLinks>

                <StyledSidebarMenuItem>
                    <DropdownMenu title="More" menus={menus.slice(2, 6)} />
                </StyledSidebarMenuItem>
            </StyledSidebarMenu>

        </div>

    )
}

export default SidebarMenu