import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

const TypographyButton = styled(Button)(({ theme, size }) => ({
    ...theme.typography[size],
    fontWeight: 'bold',
    textTransform: 'none',
    paddingRight: '22px',
    paddingLeft: '22px',
    '&:hover': {
        backgroundColor: '#9de1e0',
    }
}))

function ActionButton({ rounded, size, children, onClick, sx, href }) {
    const theme = useTheme();
    const borderRadius = rounded ? theme.shape.rounded2 : theme.shape.rounded1;
    return (
        <TypographyButton component='a' variant='contained'
            sx={{ borderRadius: borderRadius, ...sx }}
            size={size}
            onClick={onClick}
            href={href || undefined}
        >
            {children}
        </TypographyButton>
    )
}

export default ActionButton
