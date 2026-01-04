import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockIcon from '@mui/icons-material/Lock';

export default function LivePreviewCard() {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        height: 'fit-content',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VisibilityIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 18, md: 20 },
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Live Preview
          </Typography>
        </Box>
        <IconButton
          sx={{
            color: '#3B2A1A',
            '&:hover': {
              backgroundColor: 'rgba(59, 42, 26, 0.1)',
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          backgroundColor: '#FDF8F2',
          borderRadius: '12px',
          p: 4,
          textAlign: 'center',
          mb: 2,
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src="https://via.placeholder.com/300x400/FDF8F2/3B2A1A?text=T-Shirt+Preview"
          alt="Product Preview"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 0.5,
          mt: 2,
        }}
      >
        <LockIcon sx={{ fontSize: 16, color: '#666' }} />
        <Typography
          sx={{
            fontSize: 12,
            color: '#666',
          }}
        >
          Your design is protected until you publish
        </Typography>
      </Box>
    </Box>
  );
}

