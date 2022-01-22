import { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField'
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

function LinkInput() {
    const [linkToShorten, setLinkToShorten] = useState('')
    const borderRadius = useTheme().shape.rounded1;

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Grid component="form" container
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
                    transform: 'translateY(-50%)',
                }}
            >
                <StyledTextField
                    id="link-to-shorten"
                    placeholder="Shorten a link here..."
                    sx={{ flexGrow: 1, marginRight: { xs: 0, md: 3 }, marginBottom: { xs: 2.2, md: 0 } }}
                    value={linkToShorten}
                    onChange={(e) => setLinkToShorten(e.target.value)}
                />
                <ActionButton size='h6'
                    sx={{
                        paddingLeft: 4, paddingRight: 4,
                        paddingTop: { xs: 1.75, md: '6px' }, paddingBottom: { xs: 1.75, md: '6px' }
                    }}
                >
                    Shorten It!
                </ActionButton>
            </Grid >
        </Box>
    )
}

export default LinkInput