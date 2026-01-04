import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import OtpModal from './OtpModal';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProceed = () => {
    if (email && validateEmail(email) && agreed) {
      setOtpModalOpen(true);
    }
  };

  const handleOtpSubmit = (otp) => {
    console.log('OTP submitted:', otp);
    // Here you would typically verify the OTP with your backend
    // After successful verification, navigate to store setup
    setOtpModalOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/store-setup';
    }
  };

  const handleResendOtp = () => {
    console.log('Resending OTP to:', email);
    // Here you would typically call your backend to resend OTP
  };

  return (
    <Box sx={{ p: { xs: 3, md: 6 }, maxWidth: '500px', mx: 'auto' }}>
      <Typography
        sx={{
          fontFamily: "'Playfair Display'",
          fontSize: { xs: 32, md: 42 },
          fontWeight: 700,
          color: '#3B2A1A',
          mb: 2,
        }}
      >
        GET STARTED
      </Typography>

      <Typography sx={{ fontSize: 14, color: '#666', mb: 4 }}>
        Already have an account?{' '}
        <Link
          href="/login"
          sx={{
            color: '#3B2A1A',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Log In
        </Link>
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#3B2A1A', mb: 1 }}>Email Address</Typography>
        <TextField
          fullWidth
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: email ? '#F8F8F8' : '#FFFFFF',
              borderRadius: '12px',
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#3B2A1A',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#3B2A1A',
              },
            },
            '& .MuiInputBase-input': {
              paddingLeft: '45px',
            },
          }}
          InputProps={{
            startAdornment: (
              <Box
                sx={{
                  position: 'absolute',
                  left: 14,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EmailIcon sx={{ color: '#666', fontSize: 20 }} />
              </Box>
            ),
          }}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            sx={{
              color: '#3B2A1A',
              '&.Mui-checked': {
                color: '#3B2A1A',
              },
            }}
          />
        }
        label={
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            I agree to platform{' '}
            <Link href="/terms" sx={{ color: '#8B4513', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Terms of service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" sx={{ color: '#8B4513', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Privacy Policy
            </Link>
          </Typography>
        }
        sx={{ mb: 3, alignItems: 'flex-start' }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleProceed}
        disabled={!email || !validateEmail(email) || !agreed}
        sx={{
          backgroundColor: '#3B2A1A',
          color: '#FFFFFF',
          textTransform: 'none',
          borderRadius: '12px',
          py: 1.5,
          fontSize: 16,
          fontWeight: 600,
          mb: 2,
          '&:hover': { backgroundColor: '#2A1F15' },
          '&:disabled': {
            backgroundColor: '#CCCCCC',
            color: '#FFFFFF',
          },
        }}
      >
        Click To Proceed
      </Button>

      <Button
        fullWidth
        variant="contained"
        startIcon={
          <Box
            sx={{
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GoogleIcon sx={{ fontSize: 20, color: '#FFFFFF' }} />
          </Box>
        }
        sx={{
          backgroundColor: '#3B2A1A',
          color: '#FFFFFF',
          textTransform: 'none',
          borderRadius: '12px',
          py: 1.5,
          fontSize: 16,
          fontWeight: 600,
          '&:hover': { backgroundColor: '#2A1F15' },
        }}
      >
        Sign in with google
      </Button>

      <OtpModal
        open={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onSubmit={handleOtpSubmit}
        onResend={handleResendOtp}
      />
    </Box>
  );
}

