import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link, Alert } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
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

      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#3B2A1A', mb: 1 }}>Email Address</Typography>
        <TextField
          fullWidth
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#FFFFFF',
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
              // Override browser autocomplete styles
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important',
                WebkitTextFillColor: '#3B2A1A !important',
                backgroundColor: '#FFFFFF !important',
              },
              '&:-webkit-autofill:hover': {
                WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important',
                WebkitTextFillColor: '#3B2A1A !important',
                backgroundColor: '#FFFFFF !important',
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0 100px #FFFFFF inset !important',
                WebkitTextFillColor: '#3B2A1A !important',
                backgroundColor: '#FFFFFF !important',
              },
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
        disabled={!email || !validateEmail(email) || !agreed || loading}
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

