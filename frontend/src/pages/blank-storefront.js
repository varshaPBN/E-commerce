import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/theme";
import {
  Typography,
  Box,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

export default function BlankPage() {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Back Button */}
        <IconButton
          onClick={() => router.push("/dashboard")}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={600}>
          Create Your StoreFront Page !!!!!!!
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
