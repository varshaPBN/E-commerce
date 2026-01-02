import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import { useRouter } from "next/router";
import OtpModal from "../components/otp/otpModal";

export default function SignupPage() {
  const router = useRouter();
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  const handleProceed = () => {
    // Validate email before opening OTP modal
    if (email && email.includes("@")) {
      setOtpModalOpen(true);
    } else {
      alert("Please enter a valid email address");
    }
  };

  const handleOtpSubmit = (otp) => {
    console.log("OTP submitted:", otp);
    // Add your OTP verification logic here
    setOtpModalOpen(false);
    // Navigate to store setup page after successful OTP verification
    router.push("/storeSetup");
  };

  const handleResendOtp = () => {
    console.log("Resending OTP to:", email);
    // Add your resend OTP logic here
    alert("OTP has been resent to your email");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "85vw",
        mx: "auto",
        mt: 3,
        

        backgroundColor: "#FDF8F2",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        //justifyContent: "center", // horizontal center
    //alignItems: "center",    
        p: { xs: 2, md: 4 },
        boxSizing: "border-box",
        filter: otpModalOpen ? "blur(8px)" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      {/* Header with Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          flexShrink: 0,
        }}
      >
        {logoError && fallbackError ? (
          <Typography
            sx={{
              background: "linear-gradient(135deg, #9C6ADE 0%, #E91E63 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 700,
              fontSize: { xs: 24, md: 28 },
              fontFamily: "inherit",
            }}
          >
            Artloom
          </Typography>
        ) : (
          <img
            src="/logo%20(2).png"
            alt="Artloom"
            onError={() => {
              if (!logoError) {
                setLogoError(true);
              } else {
                setFallbackError(true);
              }
            }}
            style={{
              height: "48px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </Box>

      {/* Back Link */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
          flexShrink: 0,
        }}
      >
        <Link
          href="#"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#000",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 13 }}>Back</Typography>
        </Link>
      </Box>

      {/* Main Card - Takes remaining space */}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#FFFFFF",
          borderRadius: "32px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* LEFT IMAGE SECTION - 50% width */}
        <Box
          sx={{
            width: "50%",
            position: "relative",
            backgroundColor: "#F6EEE4",
            display: { xs: "none", md: "flex" },
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="/signup.png"
            alt="Signup"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "left",
            }}
          />
        </Box>

        {/* RIGHT FORM SECTION - 50% width */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "auto",
            boxSizing: "border-box",
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, md: 32 },
              mb: 1,
              fontFamily: "'Playfair Display', serif",
              color: "#1A1A1A",
            }}
          >
            GET STARTED
          </Typography>

          {/* Login Link */}
          <Typography
            sx={{
              mb: 2,
              fontSize: 13,
              color: "#666",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              component="a"
              sx={{
                color: "#1A1A1A",
                textDecoration: "none",
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Log In
            </Link>
          </Typography>

          {/* Email Input */}
          <Typography
            sx={{
              fontWeight: 600,
              mb: 0.5,
              fontSize: 13,
              color: "#1A1A1A",
            }}
          >
            Email Address
          </Typography>

          <TextField
            fullWidth
            placeholder="you@example.com"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#F8F8F8",
                borderRadius: "12px",
                "& fieldset": {
                  borderColor: "#E0E0E0",
                },
                "&:hover fieldset": {
                  borderColor: "#D0D0D0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#9C6ADE",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <EmailOutlinedIcon
                  sx={{ mr: 1.5, color: "#999", fontSize: 18 }}
                />
              ),
            }}
          />

          {/* Terms Checkbox */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Checkbox
              size="small"
              sx={{
                color: "#9C6ADE",
                "&.Mui-checked": {
                  color: "#9C6ADE",
                },
                mt: -0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: 12,
                color: "#666",
                lineHeight: 1.5,
                mt: 0.5,
              }}
            >
              I agree to platform{" "}
              <Link
                href="#"
                sx={{
                  color: "#A0522D",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Terms of service
              </Link>{" "}
              and{" "}
              <Link
                href="#"
                sx={{
                  color: "#A0522D",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Privacy Policy
              </Link>
            </Typography>
          </Box>

          {/* Primary Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleProceed}
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: "999px",
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              textTransform: "none",
              fontSize: 15,
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#2A1F15",
                boxShadow: "0px 4px 12px rgba(59, 42, 26, 0.3)",
              },
            }}
          >
            Click To Proceed
          </Button>

          {/* Google Sign In Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1.5,
              py: 1.5,
              borderRadius: "999px",
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              textTransform: "none",
              fontSize: 15,
              fontWeight: 500,
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&:hover": {
                backgroundColor: "#2A1F15",
                boxShadow: "0px 4px 12px rgba(59, 42, 26, 0.3)",
              },
            }}
          >
            <img
              src="/googleicon.jpg"
              alt="Google"
              width="18"
              height="18"
              style={{ display: "block" }}
            />
            Sign in with google
          </Button>
        </Box>
      </Box>

      {/* OTP Modal */}
      <OtpModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onSubmit={handleOtpSubmit}
        onResend={handleResendOtp}
      />
    </Box>
  );
}


//make it shoretr using components ad containers