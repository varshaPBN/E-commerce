import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

export default function DesignHeader() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('productCreationData');
    handleMenuClose();
    router.push('/');
  };
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
      <Box
        component="img"
        src="/logo.png"
        alt="Artloom Logo"
        sx={{
          height: "60px",
          cursor: "pointer",
        }}
      />

      {/* Navigation */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography
          onClick={() => {
            router.push('/dashboard');
          }}
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
      <Box>
        <Avatar
          onClick={handleAvatarClick}
          src="https://via.placeholder.com/40x40/FFB6C1/FFFFFF?text=K"
          alt="Profile"
          sx={{
            width: { xs: 36, md: 40 },
            height: { xs: 36, md: 40 },
            cursor: 'pointer',
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

