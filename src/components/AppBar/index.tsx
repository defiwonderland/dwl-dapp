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
import { useFetchBalance } from '../../hooks/useTokenBalance';
import DropdownMenu from './components/DropdownMenu';
import SidebarMenu from './components/SidebarMenu';
import UnlockButton from '../UnlockButton';
import useActiveWeb3React from '../../hooks/useActiveWeb3React';
import { VariantButton } from '../Button';
import truncateWalletAddress from '../../utils/truncateWalletAddress';
import AccountDialog from '../Dialog/AccountDialog'
import { getNetworkInfo } from '../../utils/getChainInfo';
import menus from '../../config/constants/menus';
import { useWindowWidth } from '../../hooks/useWindowWidth';

function NavBar() {
    const windowWidh = useWindowWidth(1200)
    const menuItems = windowWidh ? menus.slice(2, 6) : menus
    const logoState = window.innerWidth >= 900 ? false : true
    const [changeLogo, setChangeLogo] = useState<boolean>(logoState)
    const [open, setOpen] = useState<boolean>(false)
    const [scroll, setScroll] = useState<boolean>(false)
    const { account, chainId } = useActiveWeb3React()
    const tokenBalance = useFetchBalance()
    const networkInfo = getNetworkInfo(Number(chainId))

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
        window.addEventListener('scroll', changeNav)
        window.addEventListener('resize', updateLogo)

        return () => {
            window.removeEventListener('scroll', changeNav)
            window.removeEventListener('resize', updateLogo)
        }
    }, [])

    return (
        <>
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

                            <ImgContainer to="/">
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

                                <NavLinks to="/wonderverse">
                                    <NavItem sx={{ display: { md: 'none', lg: "block" } }}>
                                        Wonderverse
                                    </NavItem>
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
                                    <DropdownMenu title="More" menus={menuItems} />
                                </NavItem>
                            </NavMenu>

                            {
                                account ? <VariantButton width="180px" onClick={() => setOpen(true)}>
                                    <WalletIcon src="./images/wallets/metamask.svg" />
                                    <span>{truncateWalletAddress(account)}</span>
                                </VariantButton> : <UnlockButton isVariant={true} />
                            }
                        </Box>
                    </StyledToolbar>
                </StyledAppBar>
            </Box >

            <AccountDialog
                open={open}
                handleClose={() => setOpen(false)}
                account={account}
                networkName={networkInfo.networkName}
                mainToken={networkInfo.mainToken}
                balance={tokenBalance}
            />
        </>
    );
}

export default NavBar