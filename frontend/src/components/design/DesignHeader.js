import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function DesignHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 2,
        borderBottom: '1px solid #E0E0E0',
        backgroundColor: '#F7F3EB',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

      {/* Navigation */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#666',
            cursor: 'pointer',
            '&:hover': { color: '#3B2A1A' },
          }}
        >
          Dashboard
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#666',
            cursor: 'pointer',
            '&:hover': { color: '#3B2A1A' },
          }}
        >
          Products
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: '#3B2A1A',
            borderBottom: '2px solid #3B2A1A',
            pb: 0.5,
          }}
        >
          Design
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#666',
            cursor: 'pointer',
            '&:hover': { color: '#3B2A1A' },
          }}
        >
          Orders
        </Typography>
      </Box>

      {/* Profile */}
      <Avatar
        src="https://via.placeholder.com/40x40/FFB6C1/FFFFFF?text=K"
        alt="Profile"
        sx={{
          width: { xs: 36, md: 40 },
          height: { xs: 36, md: 40 },
          cursor: 'pointer',
        }}
      />
    </Box>
  );
}

