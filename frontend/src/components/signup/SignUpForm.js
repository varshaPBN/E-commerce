import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GoogleIcon from '@mui/icons-material/Google';
import OtpModal from './OtpModal';
import axios from 'axios';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProceed = async () => {
    if (email && validateEmail(email) && agreed) {
      setLoading(true);
      setError('');
      try {
        // validateStatus prevents throwing on 4xx/5xx status codes
        const response = await axios.post('/api/v1/artist/signup/email', {email}, {
          validateStatus: () => true // Don't throw on any status code
        });
  
        if (response.status === 201) {
          setOtpModalOpen(true);
        } else {
          // Handle error responses (400, 500, etc.)
          setError(response.data?.message || 'Failed to send OTP. Please try again.');
        }
      } catch (error) {
        // Fallback error handling (shouldn't reach here with validateStatus)
        if (error.request) {
          // Request was made but no response received
          setError('Network error. Please check your connection and try again.');
        } else {
          // Something else happened
          setError('An error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

   const handleOtpSubmit = async (otp) => {
    setLoading(true);
    setError('');
    try {
      // validateStatus prevents throwing on 4xx/5xx status codes
      const response = await axios.post('/api/v1/artist/signup/otp', { email, otp }, {
        validateStatus: () => true // Don't throw on any status code
      });
  
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setOtpModalOpen(false);
        if (typeof window !== 'undefined') {
          window.location.href = '/store-setup';
        }
      } else {
        // Handle error responses (400, 404, 500, etc.)
        setError(response.data?.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      // Fallback error handling (shouldn't reach here with validateStatus)
      if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      // validateStatus prevents throwing on 4xx/5xx status codes
      const response = await axios.post('/api/v1/artist/signup/email', { email }, {
        validateStatus: () => true // Don't throw on any status code
      });
      
      if (response.status === 201) {
        setOtpModalOpen(true);
      } else {
        // Handle error responses (400, 500, etc.)
        setError(response.data?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      // Fallback error handling (shouldn't reach here with validateStatus)
      if (error.request) {
        // Request was made but no response received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '500px' }}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        Get Started
      </Typography>

      <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 4, maxWidth: 420 }}>
        Already have an account?{' '}
        <Link
          href="/login"
          sx={{
            color: 'text.primary',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Log In
        </Link>
      </Typography>

      {error && (
        <Typography color="error" fontSize={14} sx={{ mb: 2, maxWidth: 420 }}>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Email address"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        InputProps={{
          startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
        }}
        sx={{ 
          mb: 2, 
          maxWidth: 420,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#FFFFFF',
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
              WebkitTextFillColor: '#000000',
            },
            '&:-webkit-autofill:hover': {
              WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
            },
            '&:-webkit-autofill:focus': {
              WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
            },
            '&:-webkit-autofill:active': {
              WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
            },
          },
          '& .MuiInputBase-input': {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #FFFFFF inset',
              WebkitTextFillColor: '#000000',
            },
          },
        }}
      />

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
          <Typography sx={{ fontSize: 14, color: 'text.secondary', lineHeight: 1.5 }}>
            I agree to platform{' '}
            <Link href="/terms" sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Terms of service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" sx={{ color: 'text.primary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Privacy Policy
            </Link>
          </Typography>
        }
        sx={{ mb: 4, alignItems: 'center' }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleProceed}
        disabled={!email || !validateEmail(email) || !agreed || loading}
        sx={{
          py: 1.6,
          borderRadius: 8,
          textTransform: 'none',
          mb: 2,
          maxWidth: 420,
        }}
      >
        {loading ? 'Processing...' : 'Click To Proceed'}
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
          py: 1.6,
          borderRadius: 8,
          textTransform: 'none',
          maxWidth: 420,
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

