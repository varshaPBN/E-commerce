import { ThemeProvider, CssBaseline } from "@mui/material";
import UserLogin from "@/components/UserLogin";
import theme from "@/theme/theme";

export default function UserLoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserLogin />
    </ThemeProvider>
  );
}





