import { useState, useRef, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ActionButton from './ActionButton';
import { styled, useTheme } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        borderRadius: theme.shape.rounded1,
        paddingLeft: { xs: '10px', md: '22px' },
    },
    '& input': {
        fontSize: '1.2rem',
    }
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
    '&:hover': {
        cursor: 'pointer',
    },
}))

function LinkInput() {
    const [linkToShorten, setLinkToShorten] = useState('')
    const [linkList, setLinkList] = useState([{
        link: 'https://www.frontendmentor.io/',
        shortened: 'https://rel.ink/k4lkyk', copied: true
    }, {
        link: 'https://www.linkedin.com/company/frontend-mentor',
        shortened: 'https://rel.ink/gob3X9'
    }]);
    // to center the input
    const [marginTop, setMarginTop] = useState(0)
    const inputRef = useRef();

    const borderRadius = useTheme().shape.rounded1;

    const offsetInput = () => {
        setMarginTop(inputRef.current.clientHeight / 2);
    }

    useEffect(() => {
        offsetInput();
        window.addEventListener('resize', offsetInput);
    }, [])

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
                    sx={{ flexGrow: 1, marginRight: { xs: 0, md: 3 }, marginBottom: { xs: 2.2, md: 0 } }}
                    value={linkToShorten}
                    onChange={(e) => setLinkToShorten(e.target.value)}
                />
                <ActionButton
                    size='h6'
                    sx={{
                        paddingLeft: 4, paddingRight: 4,
                        paddingTop: { xs: 1.75, md: '6px' }, paddingBottom: { xs: 1.75, md: '6px' }
                    }}
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
                                {link.copied === true ? (
                                    <ActionButton sx={{
                                        width: '100%',
                                        py: 1,
                                        backgroundColor: 'background.main'
                                    }}
                                        size='subtitle1'
                                    >
                                        Copied!
                                    </ActionButton>
                                ) : (
                                    <ActionButton sx={{
                                        width: '100%',
                                        py: 1,
                                    }}
                                        size='subtitle1'
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