import { Fragment } from 'react';
import Card from './Card';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { cardsData } from '../data/cards.js';

const StyledGrid = styled(Grid)(({ theme }) => ({
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '8px',
        backgroundColor: theme.palette.primary.main,
        top: `calc(50% + ${iconSize}px)`,
        zIndex: -1,
    }
}))

const iconSize = 80;

function CascadingCards() {
    return (
        <Grid container justifyContent='center'
            columns={{ xs: 1, md: 3 }}
            sx={{ maxWidth: '100%' }}
            pt={{ xs: 9, md: 7 }}
        >
            {
                cardsData.map((card, index) => (
                    <Fragment key={card.title}>
                        {
                            index != 0 && (
                                <Grid component='hr' item xs={1} md={0.09} sx={{
                                    maxWidth: { xs: '8px', md: '100%' }, height: { xs: '100px', md: '8px' },
                                    backgroundColor: 'primary.main',
                                    alignSelf: { md: 'center' },
                                    border: 'none',
                                }} >
                                </Grid>
                            )
                        }
                        <Grid item xs={1} md={0.94}
                            mt={{ xs: 0, md: 0 }}
                        >
                            <Card {...card} iconSize={iconSize} index={index} />
                        </Grid>
                    </Fragment>
                ))
            }
        </Grid >
    )
}

export default CascadingCards
