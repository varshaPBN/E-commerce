import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 6,
          mb: 4,
        }}
      >
        {/* <img
          src="/logo (2).png"
          alt="Artloom"
          style={{ height: 36 }}
          
        /> */}

        {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="Artloom Logo"
            sx={{
              height: "60px",
              cursor: "pointer",
            }} />

        <Typography fontSize={14} color="text.secondary">
          Need Help?
        </Typography>
      </Box>

      {/* MAIN CARD */}
      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
          display: "flex",
          borderRadius: 6,
          boxShadow: "0 50px 90px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            width: "45%",
            bgcolor: "#F4ECDF",
            p: 4,
          }}
        >
          <Typography fontSize={14} mb={2} sx={{ cursor: "pointer" }}>
            ← Back
          </Typography>

          <Chip
            icon={<LockOutlinedIcon fontSize="small" />}
            label="Secure access · Magic link sent"
            sx={{
              bgcolor: "#fff",
              fontSize: 12,
              mb: 3,
              borderRadius: 2,
            }}
          />

          <Card sx={{ width: 300, mx: "auto", borderRadius: 4 }}>
            <Box sx={{ position: "relative" }}>
              <img
                src="/Intersect.png"
                alt="login"
                style={{
                  width: "100%",
                  height: 320,
                  objectFit: "cover",
                  borderRadius: "16px 16px 0 0",
                }}
              />

              <FavoriteIcon
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: "red",
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  p: 0.5,
                  fontSize: 24,
                }}
              />
            </Box>

            <CardContent>
              <Typography fontWeight={600}>Abstract Soul</Typography>
              <Typography fontSize={12} color="text.secondary">
                Your Store Preview
              </Typography>
              <Typography fontSize={12} color="green">
                ● Live
              </Typography>
              <Typography fontSize={12} color="red">
                Manage
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* RIGHT PANEL */}
        <Box sx={{ width: "55%", p: 6 }}>
          <Typography variant="h4" fontWeight={600} mb={1}>
            Artist Login
          </Typography>

          <Typography
            fontSize={14}
            color="text.secondary"
            mb={4}
            maxWidth={420}
          >
            Enter your email to receive a secure magic login link.
          </Typography>

          <TextField
            fullWidth
            label="Email address"
            placeholder="you@example.com"
            InputProps={{
              startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
            }}
            sx={{ mb: 4, maxWidth: 420 }}
          />

          <Button 
            fullWidth
            variant="contained"
            sx={{
              py: 1.6,
              borderRadius: 8,
              textTransform: "none",
              maxWidth: 420,
            }}
          >
            Continue with Email →
          </Button>
        </Box>
      </Card>
    </Box>
  );
}



