import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/theme";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CookiesProvider>
  );
}
