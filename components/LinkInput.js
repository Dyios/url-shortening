import { useState, useRef, useEffect, useCallback } from 'react'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
import ActionButton from './ActionButton';
import LinkListItem from './linkListItem';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import { styled, useTheme } from '@mui/material/styles';

import { useSession } from "next-auth/react"

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

const getStoredLinks = () => JSON.parse(window.localStorage.getItem('linkList'))

function LinkInput() {
    const { data: session, status } = useSession();
    const [canLogOut, setCanLogOut] = useState(false);// to clean list of links

    const [linkToShorten, setLinkToShorten] = useState('')
    const [linkToShortenError, setLinkToShortenError] = useState(false)
    const [copiedLink, setCopiedLink] = useState(null);

    const [linkList, setLinkList] = useState([]);

    // to center the component vertically
    const [marginTop, setMarginTop] = useState(0);
    const inputRef = useRef();

    const borderRadius = useTheme().shape.rounded1;

    const offsetInput = () => {
        setMarginTop(inputRef.current.clientHeight / 2);
    }

    const handleCopiedLink = () => {
        // read clipboard to check if there is a copied link in it
        navigator.clipboard?.readText().then(clipboardText => {
            linkList.find(link => link.shortened === clipboardText) ?
                setCopiedLink(clipboardText)
                :
                setCopiedLink(null)
        })
    }

    useEffect(() => {
        // to center the component vertically
        offsetInput();
        window.addEventListener('resize', offsetInput);

        // read links from localStorage
        const storedLinks = getStoredLinks();
        storedLinks && setLinkList(storedLinks)

        // check if the link is in the clipboard
        window.addEventListener('focus', handleCopiedLink)
    }, [])

    // read links from firestore
    useEffect(() => {
        if (status === "authenticated") {
            setCanLogOut(true);

            fetch(`/api/users?user=${session.user.email}`)
                .then(res => res.json())
                .then(data => {
                    const fetchedData = data.links?.map(link => ({
                        original: link.original_link, shortened: link.short_link
                    })).reverse() || [];

                    setLinkList(fetchedData)
                })
        }
    }, [status])

    // isLoginOut Event catcher
    useEffect(() => {
        canLogOut && status === 'unauthenticated' && setLinkList([])
    }, [status])

    // save in localStorage
    useEffect(() => {
        localStorage.setItem('linkList', JSON.stringify(linkList))
    }, [linkList])

    const handleShortenUrl = useCallback((e) => {
        e.preventDefault();
        const validUrlRegex = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (linkToShorten === "") {
            setLinkToShortenError("Please add a link")
        }
        else if (linkList.find(link => link.original === linkToShorten)) {
            setLinkToShortenError("This link is already shortened")
        }
        else if (validUrlRegex.test(linkToShorten)) {
            fetch(`https://api.shrtco.de/v2/shorten?url=${linkToShorten}`)
                .then(response => response.json())
                .then(data => {
                    const { ok, result, error } = data;
                    if (ok) {
                        setLinkList((oldLinkList) => {
                            const newLinkList = [{ original: linkToShorten, shortened: result.full_short_link2 },
                            ...oldLinkList
                            ]
                            // save in firestore if auth
                            if (status === 'authenticated') {
                                fetch('/api/users', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        email: session.user.email,
                                        original_link: linkToShorten,
                                        short_link: result.full_short_link2
                                    })
                                })
                            }
                            return newLinkList
                        })
                        setLinkToShorten('')
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
                autoComplete="off"
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
                    type="url"
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
                    type='submit'
                >
                    Shorten It!
                </ActionButton>
            </Grid >
            <TransitionGroup>
                {
                    linkList.map(link => (
                        <Collapse key={link.shortened}
                            sx={{ mt: '16px' }}
                        >
                            <LinkListItem
                                link={link}
                                setLinkList={setLinkList}
                                copiedLink={copiedLink}
                                setCopiedLink={setCopiedLink}
                                TransitionComponent={Collapse}
                            />
                        </Collapse>
                    ))
                }
            </TransitionGroup>
        </Stack >
    )
}

export default LinkInput