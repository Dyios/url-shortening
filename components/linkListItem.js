import { useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'
import ActionButton from './ActionButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';

import { useSession } from "next-auth/react"

const StyledTypography = styled(Typography)(({ theme }) => ({
    '&:hover': {
        cursor: 'pointer',
    },
}))

const copyToClipboard = (text, setCopiedLink) => {
    navigator.clipboard?.writeText(text);
    setCopiedLink(text);
}

function LinkListItem({ link, setLinkList, copiedLink, setCopiedLink }) {
    const { data: session, status } = useSession();
    const [hovered, setHovered] = useState(false);

    const handleRemoveLinks = useCallback(() => {
        copiedLink === link.shortened ? setCopiedLink('') : null;
        if (status === "authenticated") {
            fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: session.user.email,
                    original_link: link.original,
                    short_link: link.shortened
                })
            })
        }
        setLinkList(linkList => linkList.filter(linkL => linkL.original !== link.original));
    }, [])

    return (
        <Paper key={link.shortened} elevation={1} sx={{
            backgroundColor: 'background.contrastText',
            padding: '1rem 1.7rem',
            overflow: 'hidden',
            position: 'relative'
        }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Slide direction='left' in={hovered}>
                <Box sx={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    width: "0",
                    height: "0",
                    borderBottom: '43px solid transparent',
                    borderLeft: '43px solid transparent',
                    borderRight: '43px solid hsl(0, 87%, 55%)'
                }}>
                    <CancelOutlinedIcon fontSize="small" sx={{
                        color: 'background.contrastText',
                        position: 'absolute',
                        right: '-39px',
                        top: '3px',
                        cursor: 'pointer'
                    }}
                        onClick={handleRemoveLinks}
                    />
                </Box>
            </Slide>
            <Stack direction={{
                xs: 'column',
                md: 'row'
            }} spacing={{
                xs: 2,
                md: 2.5
            }} alignItems={{
                md: "center"
            }}>
                <StyledTypography component='a' variant='h6' sx={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }} href={link.original} target="_blank" rel="noreferrer">
                    {link.original}
                </StyledTypography>
                <Divider sx={{
                    width: '120%',
                    transform: 'translateX(-10%)',
                    display: {
                        xs: 'block',
                        md: 'none'
                    }
                }} />
                <StyledTypography component='a' variant='h6' color='primary.main' sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }} href={link.shortened} target="_blank" rel="noreferrer">
                    {link.shortened}
                </StyledTypography>
                <Box sx={{
                    width: {
                        xs: 'none',
                        md: '120px'
                    }
                }}>
                    {copiedLink === link.shortened ? <ActionButton sx={{
                        width: '100%',
                        py: 1,
                        backgroundColor: 'background.main'
                    }} size='subtitle1' onClick={() => copyToClipboard(link.shortened, setCopiedLink)}>
                        Copied!
                    </ActionButton> : <ActionButton sx={{
                        width: '100%',
                        py: 1
                    }} size='subtitle1' onClick={() => copyToClipboard(link.shortened, setCopiedLink)}>
                        Copy
                    </ActionButton>}
                </Box>
            </Stack>
        </Paper>);
}

export default LinkListItem;