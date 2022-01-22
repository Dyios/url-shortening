import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

function MyCard({ title, description, icon, iconSize, index }) {
    const marginTop = index * iconSize / 2;
    const { background } = useTheme().palette;
    return (
        <Card sx={{
            overflow: 'visible', boxShadow: 0, mt: { xs: 0, md: `${marginTop}px` }, pb: 2
        }}>
            <CardContent sx={{ pt: 0, px: 3.5 }}>
                <Box display='flex' justifyContent={{ xs: 'center', md: 'flex-start' }}>
                    <Box sx={{
                        width: `${iconSize}px`, height: `${iconSize}px`,
                        backgroundColor: background.main,
                        borderRadius: '50%',
                        backgroundImage: `url(${icon})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        transform: 'translateY(-50%)',
                    }}
                    />
                </Box>
                <Typography variant='h5' component="h2" fontWeight='bold' mb={0}
                    sx={{ transform: 'translateY(-40%)' }}
                    textAlign={{ xs: 'center', md: 'left' }}
                >
                    {title}
                </Typography>
                <Typography color='text.secondary'
                    textAlign={{ xs: 'center', md: 'left' }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MyCard;
