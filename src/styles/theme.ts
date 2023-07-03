import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      light: '#000000',
      dark: '#000000',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#ffffff',
      contrastText: '#000000'
    },
    background: {
      paper: '#ffffff',
      default: '#000000'
    }
  },
  typography: {
    h1: {
      fontWeight: 700
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export { theme };
