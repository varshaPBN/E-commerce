import { ThemeProvider, CssBaseline } from "@mui/material";
import Login from "@/components/Login";
import theme from "@/theme/theme";


export default function LoginPage() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  );
}
