import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function OrderDetailsFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 2, md: 4 },
        py: 3,
        mt: 4,
        borderTop: '1px solid #E0E0E0',
        backgroundColor: '#F7F3EB',
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          color: '#666',
          mb: { xs: 1, md: 0 },
        }}
      >
        © 2023 Artloom. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Link
          href="#"
          sx={{
            fontSize: 14,
            color: '#666',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          sx={{
            fontSize: 14,
            color: '#666',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Terms of Service
        </Link>
      </Box>
    </Box>
  );
}



