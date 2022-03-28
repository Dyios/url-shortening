import { useState, useRef, useEffect, useCallback } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ActionButton from './ActionButton';
import { styled, useTheme } from '@mui/material/styles';

import { useQuery } from 'react-query'

const StyledTextField = styled(TextField)(({ theme, error }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        borderRadius: theme.shape.rounded1,
        paddingLeft: { xs: '10px', md: '22px' },
    },
    '& input': {
        fontSize: '1.2rem',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderWidth: '3px',
        borderColor: 'transparent',
    },
    '& ::placeholder': {
        color: error ? theme.palette.error.main : '',
        opacity: 0.7,
    },
    '&::after': {
        position: 'absolute',
        content: error ? `'${error}'` : `''`,
        left: "0%",
        top: "100%",
        marginTop: '5px',
        color: theme.palette.error.main,
        fontFamily: theme.typography.fontFamily,
        fontStyle: 'italic',
    },
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
    '&:hover': {
        cursor: 'pointer',
    },
}))

const fetchShortenedUrl = async (linkToShorten) => {
    // const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${linkToShorten}`)
    // if (!response.ok) {
    //     throw new Error('Network response was not ok')
    // }
    // return response.json()
    return fetch(`https://api.shrtco.de/v2/shorten?url=${linkToShorten}`)
        .then(response => response.json())
        .then(data => data)
}

const copyToClipboard = (text, setCopiedLink) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(text);
}

function LinkInput() {
    const [linkToShorten, setLinkToShorten] = useState('')
    const [linkToShortenError, setLinkToShortenError] = useState(false)
    const [linkList, setLinkList] = useState([]);
    const [copiedLink, setCopiedLink] = useState(null);
    // to center the component vertically
    const [marginTop, setMarginTop] = useState(0)
    const inputRef = useRef();

    const borderRadius = useTheme().shape.rounded1;

    const offsetInput = () => {
        setMarginTop(inputRef.current.clientHeight / 2);
    }

    const handleCopiedLink = () => {
        // get list from localStorage if exist
        const storedLinkList = JSON.parse(localStorage.getItem('linkList')) || []
        if (storedLinkList !== []) {
            setLinkList(storedLinkList);

            // read clipboard to check if there is a copied link in it
            navigator.clipboard.readText().then(clipboardText => {
                storedLinkList.find(link => link.shortened === clipboardText) ?
                    setCopiedLink(clipboardText)
                    :
                    setCopiedLink(null)
            });
        }
    }

    useEffect(() => {
        // to center the component vertically
        offsetInput();
        window.addEventListener('resize', offsetInput);

        // check if the link is in the clipboard
        handleCopiedLink();
        window.addEventListener('focus', handleCopiedLink)
    }, [])

    const handleShortenUrl = useCallback(() => {
        const validUrlRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (linkToShorten === "") {
            setLinkToShortenError("Please add a link")
        }
        else if (validUrlRegex.test(linkToShorten)) {
            fetch(`https://api.shrtco.de/v2/shorten?url=${linkToShorten}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    const { ok, result, error } = data;
                    if (ok) {
                        setLinkList((oldLinkList) => {
                            const newLinkList = [{ link: linkToShorten, shortened: result.full_short_link2 },
                            ...oldLinkList
                            ]
                            localStorage.setItem('linkList', JSON.stringify(newLinkList))
                            return newLinkList
                        })
                        setLinkToShortenError(false)
                    }
                    else {
                        setLinkToShortenError(error)
                    }
                })

        } else {
            setLinkToShortenError("Please enter a valid URL")
        }
    }, [linkToShorten])

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Grid component="form" container ref={inputRef}
                direction={{ xs: 'column', md: 'row' }}
                justifyContent="center"
                p={{ xs: 3.5, md: 7 }}
                sx={{
                    width: '100%', borderRadius,
                    backgroundImage: {
                        xs: "url('/images/bg-shorten-mobile.svg')",
                        sm: "url('/images/bg-shorten-desktop.svg')"
                    },
                    backgroundColor: 'background.main',
                    backgroundSize: { xs: 'fill', sm: 'cover' },
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'right',
                    mt: `-${marginTop}px`
                }}
            >
                <StyledTextField
                    id="link-to-shorten"
                    placeholder="Shorten a link here..."
                    sx={{
                        flexGrow: 1, marginRight: { xs: 0, md: 3 },
                        marginBottom: { xs: linkToShortenError ? 7.5 : 2.2, md: 0 },
                        position: 'relative'
                    }}
                    value={linkToShorten}
                    onChange={(e) => {
                        setLinkToShorten(e.target.value)
                        linkToShortenError && setLinkToShortenError(false)
                    }}
                    error={linkToShortenError}
                />
                <ActionButton
                    size='h6'
                    sx={{
                        paddingLeft: 4, paddingRight: 4,
                        paddingTop: { xs: 1.75, md: '6px' }, paddingBottom: { xs: 1.75, md: '6px' }
                    }}
                    onClick={handleShortenUrl}
                >
                    Shorten It!
                </ActionButton>
            </Grid >
            {
                linkList.map(link => (
                    <Paper key={link.shortened} elevation={1}
                        sx={{
                            backgroundColor: 'background.contrastText',
                            padding: '1rem 1.7rem',
                            overflow: 'hidden',
                        }}
                    >
                        <Stack direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 2, md: 2.5 }}
                            alignItems={{ md: "center" }}
                        >
                            <StyledTypography component='a' variant='h6'
                                sx={{
                                    flexGrow: 1,
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                                href={link.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.link}
                            </StyledTypography>
                            <Divider
                                sx={{
                                    width: '120%',
                                    transform: 'translateX(-10%)',
                                    display: { xs: 'block', md: 'none' },
                                }}
                            />
                            <StyledTypography component='a' variant='h6'
                                color='primary.main'
                                sx={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                                href={link.shortened}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.shortened}
                            </StyledTypography>
                            <Box sx={{ width: { xs: 'none', md: '120px' } }}>
                                {copiedLink === link.shortened ? (
                                    <ActionButton sx={{
                                        width: '100%',
                                        py: 1,
                                        backgroundColor: 'background.main'
                                    }}
                                        size='subtitle1'
                                        onClick={() => copyToClipboard(link.shortened, setCopiedLink)}
                                    >
                                        Copied!
                                    </ActionButton>
                                ) : (
                                    <ActionButton sx={{
                                        width: '100%',
                                        py: 1,
                                    }}
                                        size='subtitle1'
                                        onClick={() => copyToClipboard(link.shortened, setCopiedLink)}
                                    >
                                        Copy
                                    </ActionButton>
                                )}
                            </Box>
                        </Stack>
                    </Paper>
                ))
            }
        </Stack >
    )
}

export default LinkInput