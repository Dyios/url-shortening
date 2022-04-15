import '../styles/globals.css'
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { SessionProvider } from "next-auth/react"

let theme = createTheme({
  palette: {
    primary: {
      main: '#2fcfcf',//cyan
      contrastText: '#fff',
    },
    secondary: {
      main: 'hsl(257, 27%, 26%)',// navbar violet
      contrastText: 'hsl(324deg 100% 99%)',// navbar text mobile
    },
    error: {
      main: 'hsl(0, 87%, 67%)'
    },
    background: {
      main: '#3a3053', // violet
      contrastText: '#fffeff', // white
    },
    footerBackground: {
      main: '#232027', // dark violet
      contrastText: '#fffeff', // white
    },
    text: {
      primary: 'hsl(260, 8%, 14%)',// violet
      secondary: 'hsl(257, 7%, 63%)',// navbar gray desktop
    }
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  shape: {
    rounded1: '10px',
    rounded2: '30px',
  }
})

theme.typography.h2 = {
  ...theme.typography.h2,
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
