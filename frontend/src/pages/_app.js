import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
