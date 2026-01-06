import React from 'react';
import { Box, Button, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Navbar() {
  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 2, md: 6 },
        py: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(59, 42, 26, 0.1)',
        backgroundColor: '#FDF8F2',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: 1,
            backgroundColor: '#9C27B0',
            mr: 1,
          }}
        /> */}
        {/* <Box
          component="span"
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: 24,
            fontWeight: 700,
            color: '#3B2A1A',
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
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 4,
          alignItems: 'center',
        }}
      >
        {['Products', 'How it Works', 'Pricing', 'Resources'].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            sx={{
              color: '#3B2A1A',
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            {item}
          </Link>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Link
          href="/login-page"
          sx={{
            color: '#3B2A1A',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            display: { xs: 'none', sm: 'block' },
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Log in
        </Link>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          href="/sign-up"
          sx={{
            backgroundColor: '#3B2A1A',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: '999px',
            px: 3,
            py: 1,
            fontSize: 14,
            fontWeight: 500,
            '&:hover': { backgroundColor: '#2A1F15' },
          }}
        >
          Start Selling
        </Button>
      </Box>
    </Box>
  );
}

