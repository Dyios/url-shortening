import { Container, Stack, Grid } from '@mui/material'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import ActionButton from './ActionButton'
import { styled } from '@mui/material/styles'
import Navbar from './Navbar'

const StyledImage = styled('img')(({ theme }) => ({
    width: '150%',
    [theme.breakpoints.up('sm')]: {
        width: '120%',
    }
}))

function Hero({ maxWidth, sx }) {
    return (
        <Container maxWidth={false}>
            <Container maxWidth={maxWidth} sx={{ paddingBottom: { xs: '210px', md: '165px' } }}>
                <Navbar />
                <Grid sx={sx} container columns={{ xs: 1, md: 2 }} direction={{ xs: 'rom', md: 'row-reverse' }}>
                    <Grid item xs={1} md={1} sx={{ mt: { xs: 2, md: 0 } }} >
                        <StyledImage src='/images/illustration-working.svg' alt='illustration' />
                    </Grid>
                    <Grid item container xs={1} md={1} mt={{ xs: 5, md: 10 }}
                        justifyContent='flex-start'
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        direction='column'
                    >
                        <Typography variant="h2" component='h1'
                            sx={{ fontWeight: 'bold', maxWidth: '12ch' }}
                            textAlign={{ xs: 'center', md: 'left' }}
                        >
                            More than just shorter links
                        </Typography>
                        <Typography variant="h6" component='h2' color='text.secondary'
                            sx={{ maxWidth: '37ch', mt: { xs: 1.8, md: 0 } }}
                            textAlign={{ xs: 'center', md: 'left' }}
                        >
                            Build your brand&apos;s recognition and get detailed insights on how your links are performing.
                        </Typography>
                        <ActionButton rounded size='h6'
                            sx={{ width: '200px', p: 1.3, mt: 4 }}
                            href='#link-to-shorten'
                        >
                            Get started
                        </ActionButton>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}

export default Hero
