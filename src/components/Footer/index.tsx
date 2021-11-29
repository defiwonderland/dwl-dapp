import React, { useState, useEffect } from "react"
import { FooterWrapper } from "../Layout"
import { FooterContainer, LogoImg, ImgContainer, FooterLink, FooterLinkItems, SocialWrap, SocialLink, FooterExternal } from "./elements"
import Box from '@mui/material/Box';
import { StyledH5 } from "../Text";
import { Grid } from "@mui/material";
import CollapseLink from "./CollapseLink";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaSnapchat } from "react-icons/fa"
import { CollapseLinkProps } from "./types";
import UnlockButton from "../UnlockButton";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const Footer = () => {
    const { account } = useActiveWeb3React()
    const initialState = window.innerWidth >= 900 ? true : false
    const [windowWidth, setWindowWidth] = useState(initialState)
    const navigateLinks: CollapseLinkProps = {
        title: "Navigate",
        content: [
            {
                id: "001",
                text: "Exchange",
                link: "/trade"
            },
            {
                id: "002",
                text: "Liquidity",
                link: "/trade"
            },
            {
                id: "003",
                text: "Farms",
                link: "/farms"
            },
        ]
    }

    const categoryLinks: CollapseLinkProps = {
        title: "Category Name",
        content: [
            {
                id: "001",
                text: "Pools",
                link: "/pools"
            },
            {
                id: "002",
                text: "Stablecoin Vaults",
                link: "/funds"
            },
            {
                id: "003",
                text: "NFT’s",
                link: "/nfts"
            },
            {
                id: "004",
                text: "Wonderverse",
                link: "/wonderverse"
            },
            {
                id: "005",
                text: "Launchpad",
                link: "/launchpad"
            },
            {
                id: "006",
                text: "Governance",
                link: "/governance"
            },
        ]
    }

    const aboutLinks: CollapseLinkProps = {
        title: "About",
        content: [
            {
                id: "001",
                text: "Info",
                link: "https://docs.defiwonderland.finance/"
            },
            {
                id: "002",
                text: "Contact",
                link: "/"
            },
            {
                id: "003",
                text: "Docs",
                link: "/"
            },
            {
                id: "004",
                text: "Blog",
                link: "/"
            },
            {
                id: "005",
                text: "Merch",
                link: "/"
            },
        ]
    }

    const updateWindowWidth = () => {
        if (window.innerWidth >= 900) {
            setWindowWidth(true)
        } else {
            setWindowWidth(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', updateWindowWidth)

        return () => {
            window.removeEventListener('resize', updateWindowWidth)
        }
    }, [])

    return (
        <FooterWrapper>
            <FooterContainer>
                <Box sx={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "space-between"
                }
                }>
                    <ImgContainer href="/">
                        <LogoImg src="./images/logo-white.svg" />
                    </ImgContainer>

                    {
                        account ? <Box /> : <UnlockButton isVariant={true} textcolor="#ffffff" width="200px" />
                    }
                </Box>

                <div style={{ margin: "30px 0" }} />

                <Grid container spacing={0}>
                    <Grid container item sm={12} md={6} lg={2} alignItems="start">
                        {
                            windowWidth ? <div style={{ width: "100%" }}>
                                <StyledH5>{navigateLinks.title}</StyledH5>

                                <Grid container spacing={0}>
                                    <Grid container item sm={12}>
                                        <ul style={{ width: "100%" }}>
                                            {
                                                navigateLinks.content.map(item => (
                                                    <FooterLinkItems key={item.id}>
                                                        <FooterLink to={item.link}>{item.text}</FooterLink>
                                                    </FooterLinkItems>
                                                ))
                                            }
                                        </ul>
                                    </Grid>
                                </Grid>
                            </div> : <CollapseLink title={navigateLinks.title} content={navigateLinks.content} />
                        }
                    </Grid>

                    <Grid container item sm={12} md={6} lg={4} alignItems="start">
                        {
                            windowWidth ? <div style={{ width: "100%" }}>
                                <StyledH5>Category Name</StyledH5>

                                <Grid container spacing={0}>
                                    <Grid container item sm={12} md={6}>
                                        <ul style={{ width: "100%" }}>
                                            {
                                                categoryLinks.content.slice(0, 3).map(item => (
                                                    <FooterLinkItems key={item.id}>
                                                        <FooterLink to={item.link}>{item.text}</FooterLink>
                                                    </FooterLinkItems>
                                                ))
                                            }
                                        </ul>
                                    </Grid>
                                    <Grid container item sm={12} md={6}>
                                        <ul style={{ width: "100%" }}>
                                            {
                                                categoryLinks.content.slice(3, 6).map(item => (
                                                    <FooterLinkItems key={item.id}>
                                                        <FooterLink to={item.link}>{item.text}</FooterLink>
                                                    </FooterLinkItems>
                                                ))
                                            }
                                        </ul>
                                    </Grid>
                                </Grid>
                            </div> : <CollapseLink title={categoryLinks.title} content={categoryLinks.content} />
                        }
                    </Grid>

                    <Grid container item sm={12} md={6} lg={3} alignItems="start">
                        {
                            windowWidth ? <div style={{ width: "100%" }}>
                                <StyledH5>About</StyledH5>

                                <Grid container spacing={0}>
                                    <Grid container item sm={12} md={6}>
                                        <ul style={{ width: "100%" }}>
                                            {
                                                aboutLinks.content.slice(0, 3).map(item => (
                                                    <FooterLinkItems key={item.id}>
                                                        <FooterExternal href={item.link} target="_blank" >{item.text}</FooterExternal>
                                                    </FooterLinkItems>
                                                ))
                                            }
                                        </ul>
                                    </Grid>
                                    <Grid container item sm={12} md={6}>
                                        <ul style={{ width: "100%" }}>
                                            {
                                                aboutLinks.content.slice(3, 5).map(item => (
                                                    <FooterLinkItems key={item.id}>
                                                        <FooterExternal href={item.link} target="_blank">{item.text}</FooterExternal>
                                                    </FooterLinkItems>
                                                ))
                                            }
                                        </ul>
                                    </Grid>
                                </Grid>
                            </div> : <CollapseLink title={aboutLinks.title} content={aboutLinks.content} />
                        }
                    </Grid>

                    <Grid container item sm={12} md={6} lg={3} alignItems="center" justifyContent="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center"
                        }
                        }>
                            <SocialWrap>
                                <SocialLink>
                                    <FaTwitter />
                                </SocialLink>
                            </SocialWrap>

                            <SocialWrap>
                                <SocialLink>
                                    <FaFacebookF />
                                </SocialLink>
                            </SocialWrap>

                            <SocialWrap>
                                <SocialLink>
                                    <FaYoutube />
                                </SocialLink>
                            </SocialWrap>

                            <SocialWrap>
                                <SocialLink>
                                    <FaInstagram />
                                </SocialLink>
                            </SocialWrap>

                            <SocialWrap>
                                <SocialLink>
                                    <FaSnapchat />
                                </SocialLink>
                            </SocialWrap>
                        </Box>
                    </Grid>
                </Grid>
            </FooterContainer>
        </FooterWrapper >
    )
}

export default Footer