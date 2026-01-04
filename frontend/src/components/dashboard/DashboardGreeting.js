import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

export default function DashboardGreeting() {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 3,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 24, md: 32 },
            fontWeight: 700,
            color: '#3B2A1A',
            mb: 0.5,
          }}
        >
          Good Morning, Kiara
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 14, md: 16 },
            color: '#666',
          }}
        >
          Here's what's happening with your store Today.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mt: { xs: 2, md: 0 },
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <Button
          variant="outlined"
          startIcon={<StorefrontIcon />}
          sx={{
            borderColor: '#3B2A1A',
            color: '#3B2A1A',
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            py: 1,
            fontSize: 14,
            fontWeight: 600,
            '&:hover': {
              borderColor: '#2A1F15',
              backgroundColor: '#F5F5F5',
            },
          }}
        >
          View Storefront
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/product-creation')}
          sx={{
            backgroundColor: '#3B2A1A',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            py: 1,
            fontSize: 14,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#2A1F15',
            },
          }}
        >
          Create Product
        </Button>
      </Box>
    </Box>
  );
}

