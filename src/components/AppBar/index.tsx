import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
    StyledToolbar,
    StyledAppBar,
    LogoImg,
    ImgContainer,
    NavMenu,
    NavItem,
    NavLinks,
    WalletIcon
} from './elements/Toolbar';
import DropdownMenu from './components/DropdownMenu';
import SidebarMenu from './components/SidebarMenu';
import UnlockButton from '../UnlockButton';
import { useWeb3React } from "@web3-react/core";
import { VariantButton } from '../Button';
import truncateWalletAddress from '../../utils/truncateWalletAddress';

function NavBar() {
    const initialState = window.innerWidth >= 1200 ? ["Info", "Contact", "Documents", "Blog"] : ["Info", "Contact", "Documents", "Blog", "Launchpad", "Governance"]
    const logoState = window.innerWidth >= 900 ? false : true
    const [menuItems, setMenuItems] = useState<string[]>(initialState)
    const [changeLogo, setChangeLogo] = useState<boolean>(logoState)
    const [scroll, setScroll] = useState<boolean>(false)
    const { account } = useWeb3React()

    const updateMenuItems = () => {
        if (window.innerWidth >= 1200) {
            setMenuItems(["Info", "Contact", "Documents", "Blog"])
        } else {
            setMenuItems(["Info", "Contact", "Documents", "Blog", "Launchpad", "Governance"])
        }
    }

    const updateLogo = () => {
        if (window.innerWidth >= 900) {
            setChangeLogo(false)
        } else {
            setChangeLogo(true)
        }
    }

    const changeNav = () => {
        if (window.scrollY > 0) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateMenuItems)
        window.addEventListener('scroll', changeNav)
        window.addEventListener('resize', updateLogo)

        return () => {
            window.removeEventListener('resize', updateMenuItems)
            window.removeEventListener('scroll', changeNav)
            window.removeEventListener('resize', updateLogo)
        }
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar
                position="fixed"
                scroll={scroll.toString()}
            >
                <StyledToolbar>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <SidebarMenu />

                        <ImgContainer href="/">
                            {
                                !changeLogo ? <LogoImg src="./images/logo.svg" /> : <LogoImg src="./images/mini-logo.svg" />
                            }
                        </ImgContainer>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <NavMenu>
                            <NavLinks to="/trade">
                                <NavItem>Trade</NavItem>
                            </NavLinks>

                            <NavLinks to="/funds">
                                <NavItem>Hedge Funds</NavItem>
                            </NavLinks>

                            <NavLinks to="/farms">
                                <NavItem>Farms</NavItem>
                            </NavLinks>

                            <NavLinks to="/pools">
                                <NavItem>Pools</NavItem>
                            </NavLinks>

                            <NavLinks to="/nfts">
                                <NavItem>NFT's</NavItem>
                            </NavLinks>

                            <NavLinks to="/launchpad">
                                <NavItem sx={{ display: { md: 'none', lg: "block" } }}>
                                    Launchpad
                                </NavItem>
                            </NavLinks>

                            <NavLinks to="/governance">
                                <NavItem sx={{ display: { md: 'none', lg: "block" } }}>Governance</NavItem>
                            </NavLinks>

                            <NavItem>
                                <DropdownMenu title="More" menuItems={menuItems} />
                            </NavItem>
                        </NavMenu>

                        {
                            account ? <VariantButton width="180px">
                                <WalletIcon src="./images/metamask.svg" />
                                <span>{truncateWalletAddress(account)}</span>
                            </VariantButton> : <UnlockButton isVariant={true} />
                        }
                    </Box>
                </StyledToolbar>
            </StyledAppBar>
        </Box >
    );
}

export default NavBar