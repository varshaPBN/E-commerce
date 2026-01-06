import React from 'react';
import { Box, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SignUpHeader() {
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
          {/* <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1,
              background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
              mr: 1,
            }}
          /> */}
          {/* <Box
            component="span"
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: 24,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Artloom
          </Box> */}
          <Box
            component="img"
            src="/logo.png"
            alt="Artloom Logo"
            sx={{
              height: "60px",
              cursor: "pointer",
            }}
          />
        </Box>
        <Link
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#3B2A1A',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            ml: -15,
            mt: 10,
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

