import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../styles/mui/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
