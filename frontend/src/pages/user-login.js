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




// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import UserLogin from "@/components/UserLogin";
// import theme from "@/style/mui/theme";

// export default function UserLoginPage() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <UserLogin />
//     </ThemeProvider>
//   );
// }
