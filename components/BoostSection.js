import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ActionButton from './ActionButton';

function BoostSection({ maxWidth }) {
    return (
        <Container component="section" maxWidth={false}
            sx={{
                backgroundColor: 'background.main',
                backgroundImage: {
                    xs: 'url("/images/bg-boost-mobile.svg")',
                    sm: 'url("/images/bg-boost-desktop.svg")'
                },
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
            }}
        >
            <Container maxWidth={maxWidth} sx={{ py: 7 }} >
                <Typography component='h2' variant='h4' fontWeight='bold'
                    color='background.contrastText'
                    textAlign='center'
                >
                    Boost your links today
                </Typography>
                <Box display='flex' justifyContent='center'>
                    <ActionButton rounded size='subtitle1'
                        sx={{ width: '200px', p: 1.3, mt: 4 }}
                        href='#link-to-shorten'
                    >
                        Get started
                    </ActionButton>
                </Box>
            </Container>
        </Container>
    );
}

export default BoostSection;
