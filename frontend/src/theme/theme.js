import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513', // Dark brown
      light: '#A0522D',
      dark: '#654321',
    },
    secondary: {
      main: '#D2B48C', // Tan/beige
      light: '#F5DEB3', // Light beige
      dark: '#BC9A6A',
    },
    background: {
      default: '#FAF8F3', // Soft beige/cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#8B4513', // Dark brown
      secondary: '#654321',
    },
    success: {
      main: '#4CAF50', // Green for checkmarks
      light: '#81C784',
      dark: '#388E3C',
    },
  },
  typography: {
    fontFamily: '"Inter"',
    h1: {
      fontFamily: '"Playfair Display"',
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      color: '#8B4513',
    },
    h2: {
      fontFamily: '"Playfair Display"',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: '#8B4513',
    },
    h3: {
      fontFamily: '"Playfair Display"',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: '#8B4513',
    },
    h4: {
      fontFamily: '"Playfair Display"',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#8B4513',
    },
    h5: {
      fontFamily: '"Playfair Display"',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: '#8B4513',
    },
    h6: {
      fontFamily: '"Playfair Display"',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
      color: '#8B4513',
    },
    body1: {
      fontFamily: '"Inter"',
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#8B4513',
    },
    body2: {
      fontFamily: '"Inter"',
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#654321',
    },
    button: {
      fontFamily: '"Inter"',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: 600,
        },
        contained: {
          boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(139, 69, 19, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;

