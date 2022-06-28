import { createTheme } from '@mui/material/styles';

const primary = {
  main: '#2f9331',
  light: '#83d2e4'
};

export default createTheme({
  palette: {
    primary
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#83d2e4'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '40px'
        }
      }
    },
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: '#2f9331',
          color: 'white',
          '&:hover': {
            backgroundColor: '#216723'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        text: {
          '&:hover': {
            backgroundColor: primary.light
          }
        }
      }
    }
  }
});
