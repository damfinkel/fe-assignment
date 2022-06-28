import { createTheme } from '@mui/material/styles';

export default createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#2f9331'
        }
      }
    },
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
    }
  }
});
