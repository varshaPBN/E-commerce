import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function StoreSetupForm() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [domain, setDomain] = useState('');
  const [artistName, setArtistName] = useState('');
  
  // Check if router is ready
  const isRouterReady = router.isReady !== false;

  const handleFinish = () => {
    // Handle form submission
    console.log('Store setup:', { storeName, domain, artistName });
    console.log('Navigating to dashboard...');
    console.log('Router ready:', isRouterReady);
    
    if (!isFormValid) {
      console.warn('Form is not valid, cannot proceed');
      return;
    }
    
    // Use router.push with error handling
    if (isRouterReady) {
      router.push('/dashboard').then(() => {
        console.log('Navigation successful');
      }).catch((error) => {
        console.error('Router navigation failed:', error);
        // Fallback to window.location
        window.location.href = '/dashboard';
      });
    } else {
      // If router not ready, use window.location directly
      console.log('Router not ready, using window.location');
      window.location.href = '/dashboard';
    }
  };

  const isFormValid = storeName.trim() && domain.trim() && artistName.trim();

  // Debug log
  React.useEffect(() => {
    console.log('Form validation:', {
      storeName: storeName.trim(),
      domain: domain.trim(),
      artistName: artistName.trim(),
      isFormValid,
    });
  }, [storeName, domain, artistName, isFormValid]);

  return (
    <Box sx={{ maxWidth: '600px', width: '100%', position: 'relative', zIndex: 10, pointerEvents: 'auto' }}>
      <Typography
        sx={{
          fontFamily: "'Playfair Display'",
          fontSize: { xs: 32, md: 42 },
          fontWeight: 700,
          color: '#3B2A1A',
          mb: 2,
        }}
      >
        Let's build your store now
      </Typography>

      <Typography sx={{ fontSize: 14, color: '#666', mb: 4, lineHeight: 1.6 }}>
        Give your new creative space a name and a look. You can change this anytime.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#3B2A1A', mb: 1 }}>
          Store Name <span style={{ color: '#FF0000' }}>*</span>
        </Typography>
        <TextField
          fullWidth
          placeholder="This is how your store appear to customers."
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: storeName ? '#F8F8F8' : '#FFFFFF',
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
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#3B2A1A', mb: 1 }}>
          Domain <span style={{ color: '#FF0000' }}>*</span>
        </Typography>
        <TextField
          fullWidth
          placeholder="Choose a unique link for your store. You can change it later."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: domain ? '#F8F8F8' : '#FFFFFF',
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
          }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#3B2A1A', mb: 1 }}>
          Artist Name <span style={{ color: '#FF0000' }}>*</span>
        </Typography>
        <TextField
          fullWidth
          placeholder="Please enter your name here."
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: artistName ? '#F8F8F8' : '#FFFFFF',
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
          }}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#3B2A1A', mb: 1 }}>Logo</Typography>
        <Box
          component="input"
          type="file"
          accept="image/png,image/jpeg"
          sx={{ display: 'none' }}
          id="logo-upload"
        />
        <Box
          component="label"
          htmlFor="logo-upload"
          sx={{
            border: '2px dashed #D0D0D0',
            borderRadius: '12px',
            p: { xs: 3, md: 4 },
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'block',
            width: '100%',
            '&:hover': {
              borderColor: '#3B2A1A',
              backgroundColor: '#F8F8F8',
            },
          }}
        >
          <ArrowUpwardIcon sx={{ color: '#666', fontSize: { xs: 32, md: 40 }, mb: 1 }} />
          <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: '#666', fontWeight: 500 }}>
            Upload a file or drag and drop.
          </Typography>
          <Typography sx={{ fontSize: { xs: 11, md: 12 }, color: '#999', mt: 0.5 }}>
            PNG, JPG and up to 10MB.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ position: 'relative', zIndex: 100, pointerEvents: 'auto', mt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button clicked!');
            console.log('Form valid:', isFormValid);
            handleFinish();
          }}
          type="button"
          sx={{
            backgroundColor: isFormValid ? '#3B2A1A' : '#CCCCCC',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: '12px',
            py: 1.5,
            fontSize: 16,
            fontWeight: 600,
            position: 'relative',
            zIndex: 100,
            pointerEvents: 'auto',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            opacity: isFormValid ? 1 : 0.6,
            '&:hover': { 
              backgroundColor: isFormValid ? '#2A1F15' : '#CCCCCC',
            },
          }}
        >
          Click to Finish
        </Button>
      </Box>
    </Box>
  );
}

