import {
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//  import OTP modal
import OtpModal from "@/components/signup/OtpModal";

export default function UserLogin() {
  const router = useRouter();

  // state to control OTP popup
  const [otpOpen, setOtpOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // open modal and send OTP
  const handleLoginClick = async () => {
    // Validate email
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Send OTP to backend - validateStatus prevents throwing on 4xx/5xx
      const response = await axios.post("/api/v1/send-otp", { email }, {
        validateStatus: () => true // Don't throw on any status code
      });
      
      if (response.status === 200 && response.data.message === "OTP sent successfully") {
        setSuccess("OTP sent to your email!");
        setOtpOpen(true);
      } else {
        setError(
          response.data?.message || "Failed to send OTP. Please try again."
        );
      }
    } catch (err) {
      // Fallback error handling (shouldn't reach here with validateStatus)
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // close modal
  const handleCloseOtp = () => {
    setOtpOpen(false);
    setError("");
    setSuccess("");
  };

  // OTP submit handler
  const handleOtpSubmit = async (otp) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Verify OTP with backend - validateStatus prevents throwing on 4xx/5xx
      const response = await axios.post("/api/v1/verify-otp", {
        email,
        otp,
      }, {
        validateStatus: () => true // Don't throw on any status code
      });

      if (response.status === 200 && response.data.message === "OTP verified successfully") {
        // Store JWT token in cookie using react-cookie
        if (response.data.token) {
          const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
          const expires = new Date(Date.now() + expiresIn);
          cookies.set("authToken", response.data.token, {
            path: "/",
            expires: expires,
            sameSite: "lax",
            secure: window.location.protocol === "https:",
          });
        }
        
        setSuccess("OTP verified successfully!");
        setOtpOpen(false);
        const returnUrl = router.query.returnUrl || router.query.redirect;
        let redirectPath = "/user-product-page/69510d53b813f65b9da439b2";
        
        if (returnUrl) {
          try {
            const decodedUrl = decodeURIComponent(returnUrl);
            if (decodedUrl && 
                decodedUrl.startsWith("/") && 
                !decodedUrl.includes("[") && 
                !decodedUrl.includes("]") &&
                decodedUrl.length > 1) {
              redirectPath = decodedUrl;
            }
          } catch (e) {
            console.warn("Failed to decode returnUrl:", e);
          }
        }
        
        setTimeout(() => {
          router.push(redirectPath);
        }, 500);
      } else {
        // Handle error responses (400, 500, etc.)
        setError(
          response.data?.message || "Invalid OTP. Please check and try again."
        );
      }
    } catch (err) {
      // Fallback error handling (shouldn't reach here with validateStatus)
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // resend OTP handler
  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Resend OTP to backend - validateStatus prevents throwing on 4xx/5xx
      const response = await axios.post("/api/v1/send-otp", { email }, {
        validateStatus: () => true // Don't throw on any status code
      });

      if (response.status === 200 && response.data.message === "OTP sent successfully") {
        setSuccess("OTP resent to your email!");
      } else {
        setError(
          response.data?.message || "Failed to resend OTP. Please try again."
        );
      }
    } catch (err) {
      // Fallback error handling (shouldn't reach here with validateStatus)
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "flex",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
            bgcolor: "rgba(253, 248, 242, 0)",
          }}
        >
          {/* LEFT */}
          <Box
            sx={{
              width: "50%",
              p: 6,
              backgroundImage: "url('/userLogin.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography variant="h5" fontWeight={600} mb={1}>
              Welcome Back
            </Typography>

            <Typography fontSize={14} color="text.secondary" mb={4}>
              Log in to your account to checkout faster and track your order
            </Typography>

            <Typography fontSize={14} mb={1}>
              Email Address
            </Typography>

            <TextField
              fullWidth
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading}
              error={!!error && !otpOpen}
              InputProps={{
                startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
              }}
              sx={{ mb: 2 }}
            />

            {error && !otpOpen && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && !otpOpen && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Box display="flex" alignItems="center">
                <Checkbox />
                <Typography fontSize={13}>Remember me</Typography>
              </Box>
            </Box>

            {/* OTP trigger */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleLoginClick}
              disabled={loading}
              sx={{
                bgcolor: "#8B5E3C",
                py: 1.4,
                borderRadius: 6,
                textTransform: "none",
                "&:disabled": {
                  bgcolor: "#CCCCCC",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Log In And Checkout"
              )}
            </Button>
          </Box>

          {/* RIGHT */}
          <Box sx={{ width: "50%", bgcolor: "#F4ECDF", p: 6 }}>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Guest Checkout
            </Typography>

            <Typography fontSize={14} color="text.secondary" mb={3}>
              No account? Proceed securely without creating one.
            </Typography>

            {[
              "Instant checkout process",
              "Secure payment processing",
              "Track order via mail",
            ].map((item) => (
              <Box key={item} display="flex" alignItems="center" mb={2}>
                <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                <Typography fontSize={14}>{item}</Typography>
              </Box>
            ))}

            <Button
              fullWidth
              variant="contained"
              onClick={() => router.push("/user-product-page/69510d53b813f65b9da439b2")}
              sx={{
                mt: 11,
                bgcolor: "#8B5E3C",
                py: 1.2,
                borderRadius: 6,
                textTransform: "none",
              }}
            >
              Continue as Guest
            </Button>
          </Box>
        </Box>
      </Box>

      {/* OTP MODAL */}
      <OtpModal
        open={otpOpen}
        onClose={handleCloseOtp}
        onSubmit={handleOtpSubmit}
        onResend={handleResendOtp}
        error={otpOpen ? error : ""}
        loading={loading}
      />
    </>
  );
}
