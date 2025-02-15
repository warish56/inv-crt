import { createTheme } from '@mui/material';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'bold-contained': true;
    'bold-outlined': true;
  }
}

export const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#c2185b',
      light: '#f48fb1',
      dark: '#880e4f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#18c2ba',      // Complementary teal
      light: '#4df3eb',
      dark: '#00918b',
      contrastText: '#ffffff',
    },
    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f8f8',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  components: {
    MuiTextField: {
      styleOverrides: {
        root:{
          variants: [
            {
              props: { variant: 'outlined' },
              style: ({theme}) => theme.unstable_sx({
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'grey.50',
                      borderRadius: '8px',
                      minHeight: '56px',
                      '&.Mui-disabled fieldset': {
                        borderColor: 'grey.200',
                      },
                      '&:hover:not(.Mui-disabled) fieldset': {
                        borderColor: 'primary.main',
                      },
                      '& fieldset': {
                        borderWidth: '2px',
                      },
                  }
              })
            }
          ]
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          variants:[
            {
              props: {variant: 'bold-contained'},
              style: ({theme}) => theme.unstable_sx({
                paddingBlock: '16px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                textTransform: 'none',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                boxShadow: '0 4px 12px rgba(194, 24, 91, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(194, 24, 91, 0.4)',
                },
                transition: 'all 0.2s ease-in-out',
              })
            },
            {
              props: {variant: 'bold-outlined'},
              style: ({theme}) => theme.unstable_sx({
                py: 2,
                borderRadius: '12px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'divider',
                backgroundColor: 'white',
                color: 'text.primary',
                fontSize: '1.1rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: "primary.main",
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              })
            }
          ]
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});