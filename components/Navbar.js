import { useState, useCallback } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import ActionButton from './ActionButton';

import { useSession, signIn, signOut } from "next-auth/react"

import logo from '../public/images/logo.svg'

const links = ['Features', 'Pricing', 'Resources'];

const StyledTypography = styled(Typography)(({ theme }) => ({
    // ...theme.typography.h6
    fontWeight: 'bold',
    marginRight: '30px',
    color: theme.palette.text.secondary,
    '&:hover': {
        cursor: 'pointer',
        color: theme.palette.text.primary,
    }
}))

const TypographyButton = styled(Button)(({ theme, size }) => ({
    ...theme.typography[size],
    fontWeight: 'bold',
    textTransform: 'none',
    paddingRight: '22px',
    paddingLeft: '22px',
    '&:hover': {
        backgroundColor: '#9de1e0',
    }
}))

const handleSignIn = (e, handleCloseNavMenu) => {
    e.preventDefault()
    handleCloseNavMenu && handleCloseNavMenu()
    signIn()
}
const handleSignOut = (e, handleCloseNavMenu) => {
    e.preventDefault()
    handleCloseNavMenu && handleCloseNavMenu()
    signOut({ redirect: false })
}

const StyledMenu = styled(Menu)(({ theme }) => ({
    maxWidth: theme.breakpoints.values.sm,
    marginTop: '20px',
    '& > *': {
        width: '100%',
    },
    '& .MuiPaper-root': {
        padding: '25px 40px',
        borderRadius: '10px',
        boxShadow: 'none',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary.contrastText,
    }
}))

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { data: session, status } = useSession();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const StyledMenuItem = useCallback(({ item, handleClick = handleCloseNavMenu }) => (
        <MenuItem onClick={handleClick}>
            <Typography sx={{ width: '100%', fontWeight: 'bold', m: 1 }}
                variant="h6"
                component="a"
                textAlign="center"
                color='secondary.contrastText'>
                {item}
            </Typography>
        </MenuItem>
    ), [])

    return (
        <Container sx={{ mt: 2 }} disableGutters >
            <Toolbar sx={{ flexDirection: 'column', alignItems: 'inherit' }} disableGutters>
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <Box sx={{ flexGrow: { xs: 1, md: 0 }, mr: 1, pt: 1 }}>
                        <Image src={logo} alt="Shortly logo" />
                    </Box>
                    <Box component='ul'
                        sx={{ flexGrow: 1, listStyleType: 'none', display: { xs: 'none', md: 'flex' } }} >
                        {links.map(link => (
                            <Link key={link} href={`/`} passHref>
                                <StyledTypography component='li' variant="subtitle1" >{link}</StyledTypography>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} >
                        {
                            status === 'authenticated' ? (
                                <ActionButton rounded size='subtitle1'
                                    onClick={handleSignOut}
                                >
                                    Sign out
                                </ActionButton>
                            ) : (
                                <>
                                    <StyledTypography variant="subtitle1" component='a'
                                        onClick={handleSignIn}
                                    >
                                        Login
                                    </StyledTypography>
                                    <ActionButton rounded size='subtitle1'
                                        onClick={handleSignIn}
                                    >
                                        Sign up
                                    </ActionButton>
                                </>
                            )
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="default"
                        >
                            <MenuIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </Box>
                <StyledMenu component='nav'
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {links.map((link) => <StyledMenuItem key={link} item={link} />)}
                    <Divider variant='middle' light sx={{ backgroundColor: 'text.secondary' }} />
                    {
                        status === 'unauthenticated' ? (
                            <>
                                <StyledMenuItem item={'Login'}
                                    handleClick={(e) => handleSignIn(e, handleCloseNavMenu)}
                                />
                                <ActionButton size='h6'
                                    rounded
                                    onClick={(e) => handleSignIn(e, handleCloseNavMenu)}
                                    sx={{ width: '100%', p: 1, m: 1 }}
                                >
                                    Sign up
                                </ActionButton>
                            </>
                        ) : (
                            <ActionButton size='h6'
                                rounded
                                onClick={(e) => handleSignOut(e, handleCloseNavMenu)}
                                sx={{ width: '100%', p: 1, m: 1 }}
                            >
                                Sign Out
                            </ActionButton>
                        )
                    }
                </StyledMenu>
            </Toolbar>
        </Container >
    )
}

export default Navbar
