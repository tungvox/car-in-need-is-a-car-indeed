// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"IBM Plex Sans", sans-serif',
  },
  palette: {
    primary: {
      main: 'rgb(76, 76, 76)',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: 'white',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
      },
    },
  },
});

export default theme;
