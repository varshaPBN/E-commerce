import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";

const OtpModal = ({ open, onClose, onSubmit, onResend }) => {
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp);
      setOtp("");
    }
  };

  const handleResend = () => {
    if (onResend) {
      onResend();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          padding: "8px",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          pb: 1,
          fontWeight: 700,
          fontSize: 24,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Enter OTP
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Typography
            sx={{
              fontSize: 14,
              color: "#666",
              textAlign: "center",
              mb: 1,
            }}
          >
            We've sent a verification code to your email
          </Typography>

          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            fullWidth
            inputProps={{
              maxLength: 6,
              style: {
                textAlign: "center",
                fontSize: 24,
                letterSpacing: "8px",
                fontWeight: 600,
              },
            }}
            sx={{
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
            placeholder="000000"
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={otp.length !== 6}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "999px",
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              textTransform: "none",
              fontSize: 16,
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#2A1F15",
                boxShadow: "0px 4px 12px rgba(59, 42, 26, 0.3)",
              },
              "&:disabled": {
                backgroundColor: "#CCCCCC",
                color: "#FFFFFF",
              },
            }}
          >
            Verify OTP
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 1,
            }}
          >
            <Typography sx={{ fontSize: 13, color: "#666" }}>
              Didn't receive the code?
            </Typography>
            <Link
              component="button"
              onClick={handleResend}
              sx={{
                color: "#A0522D",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Resend OTP
            </Link>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
