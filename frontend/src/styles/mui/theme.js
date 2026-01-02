import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#FDF8F2",
    },
    primary: {
      main: "#3B2A1A",
    },
  },
  typography: {
    fontFamily: '"Inter", "Playfair Display", sans-serif',
    h3: {
      fontFamily: '"Playfair Display", serif',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
