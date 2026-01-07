import React from 'react';
import { Box, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function StoreSetupHeader() {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: 6 },
        py: 3,
        backgroundColor: '#FDF8F2',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          
          
        </Box>
        <Link
          href="/sign-up"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#3B2A1A',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            ml: 4,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Back
        </Link>
      </Box>
    </Box>
  );
}

