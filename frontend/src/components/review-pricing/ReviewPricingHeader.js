import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';

export default function ReviewPricingHeader() {
  const router = useRouter();

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4 },
        py: 3,
        backgroundColor: '#F7F3EB',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <AutoAwesomeIcon sx={{ color: '#9C27B0', fontSize: 28 }} />
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 20, md: 24 },
            fontWeight: 700,
            color: '#3B2A1A',
          }}
        >
          Artloom
        </Typography>
      </Box>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.push('/product-creation');
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          fontSize: 14,
          color: '#3B2A1A',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        <ArrowBackIcon sx={{ fontSize: 16 }} />
        Back to design
      </Link>
    </Box>
  );
}

