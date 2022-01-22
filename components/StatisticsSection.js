import Stack from "@mui/material/Stack"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { Typography } from "@mui/material"
import LinkInput from "./LinkInput"
import CascadingCards from "./CascadingCards"

function StatisticsSection({ maxWidth }) {
    return (
        <Container maxWidth={false}
            sx={{ backgroundColor: '#f0f1f6', pb: { xs: '80px', md: '120px' } }}
        >
            <Container maxWidth={maxWidth} >
                <Stack component='section' spacing={{ xs: 0, md: 6 }} alignItems='center'>
                    <LinkInput />
                    <Box>
                        <Typography component='h3' variant='h4' textAlign='center' fontWeight='bold'>
                            Advanced Statistics
                        </Typography>
                        <Typography component='p' variant='h6' textAlign='center'
                            color='text.secondary'
                            maxWidth='45ch'
                            mt={2}
                            gutterBottom
                        >
                            Track how your links are performing across the web with our advanced statistics dashboard.
                        </Typography>
                    </Box>
                    <CascadingCards />
                </Stack>
            </Container>
        </Container>
    )
}

export default StatisticsSection
