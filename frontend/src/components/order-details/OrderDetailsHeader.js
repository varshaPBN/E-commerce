import React from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Avatar } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

export default function OrderDetailsHeader() {
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
          Studio
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
          Supply Store
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
          Community
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
          Resources
        </Typography>
      </Box>

      {/* Search and Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          placeholder="Search supplies..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#666', fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            display: { xs: 'none', md: 'block' },
            width: 200,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
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
        <IconButton sx={{ color: '#3B2A1A' }}>
          <ShoppingCartIcon />
        </IconButton>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            backgroundColor: '#3B2A1A',
            cursor: 'pointer',
          }}
        >
          <PersonIcon sx={{ fontSize: 20 }} />
        </Avatar>
      </Box>
    </Box>
  );
}



