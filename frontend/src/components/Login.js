import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [step, setStep] = useState(1); // 1 = email, 2 = otp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.post(`${API_URL}/api/v1/artist/login`, {
        email
      });
      
      console.log("OTP sent:", response.data.message);
      setStep(2); // Move to OTP verification step
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.post(`${API_URL}/api/v1/artist/verify-otp`, {
        email,
        otp
      });
      
      // Store token in localStorage
      localStorage.setItem("artistToken", response.data.token);
      
      // Redirect to dashboard
      router.push("/dashboard");
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };


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

            {/* <CardContent>
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
            </CardContent> */}

            <CardContent>
              <Typography fontWeight={600}>Abstract Soul</Typography>

              <Typography fontSize={12} color="text.secondary">
                Your Store Preview
              </Typography>

              {/* Live + Manage in one line */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <Typography fontSize={12} color="green">
                  ● Live
                </Typography>

                <Typography
                  fontSize={12}
                  color="red"
                  sx={{ cursor: "pointer",ml:20 }}
                >
                  Manage
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* RIGHT PANEL */}
        <Box sx={{ width: "55%", p: 6 }}>
          <Typography variant="h4" fontWeight={600} mb={1} >
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

                    {step === 1 ? (
            // Email input
            <TextField
              fullWidth
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
              }}
              sx={{ mb: 4, maxWidth: 420 }}
            />
          ) : (
            // OTP input
            <TextField
              fullWidth
              label="Enter OTP"
              placeholder="6-digit code"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              InputProps={{
                startAdornment: <LockOutlinedIcon sx={{ mr: 1 }} />,
              }}
              sx={{ mb: 2, maxWidth: 420 }}
            />
          )}

          {/* ADD error message display */}
          {error && (
            <Typography color="error" fontSize={14} sx={{ mb: 2, maxWidth: 420 }}>
              {error}
            </Typography>
          )}

          <Button 
          fullWidth
          variant="contained"
          disabled={loading || (step === 1 ? !email : !otp)}
          onClick={step === 1 ? handleSendOTP : handleVerifyOTP}
          sx={{
            py: 1.6,
            borderRadius: 8,
            textTransform: "none",
            maxWidth: 420,
          }}
        >
          {loading 
            ? "Loading..." 
            : step === 1 
            ? "Continue with Email →" 
            : "Verify OTP →"
          }
        </Button>

        {step === 2 && (
          <Button
            fullWidth
            onClick={() => setStep(1)}
            sx={{
              mt: 2,
              maxWidth: 420,
              textTransform: "none",
            }}
          >
            ← Change Email
          </Button>
         )}
        </Box>
      </Card>
    </Box>
  );
}



