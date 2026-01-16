import React, { useState } from 'react';
import { Box, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

export default function DashboardHeader({ artistInfo }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  // Get avatar from artistInfo, fallback to placeholder or initials
  const getAvatarSrc = () => {
    // Check if avatar exists and is not empty
    if (artistInfo?.avatar && artistInfo.avatar.trim() !== '') {
      return artistInfo.avatar;
    }
    return null; // Will show initials if no avatar
  };

  // Get initials for fallback
  const getInitials = () => {
    if (artistInfo?.name) {
      const names = artistInfo.name.trim().split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return 'A'; // Default initial
  };

  // Get background color for avatar based on name
  const getAvatarColor = () => {
    if (artistInfo?.name) {
      const colors = ['#FFB6C1', '#B19CD9', '#87CEEB', '#98D8C8', '#F7DC6F', '#F8B88B'];
      const index = artistInfo.name.charCodeAt(0) % colors.length;
      return colors[index];
    }
    return '#FFB6C1'; // Default pink
  };

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
        backgroundColor: '#FFFFFF',
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
            router.push('/dashboard').catch(() => {
              window.location.href = '/dashboard';
            });
          }}
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: '#3B2A1A',
            borderBottom: '2px solid #3B2A1A',
            pb: 0.5,
            cursor: 'pointer',
            '&:hover': { color: '#2A1F15' },
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
          onClick={() => {
            localStorage.removeItem('productCreationData');
            router.push('/product-creation?fresh=true');
          }}
          sx={{
            fontSize: 16,
            fontWeight: 400,
            color: '#666',
            cursor: 'pointer',
            '&:hover': { color: '#3B2A1A' },
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
          src={getAvatarSrc()}
          alt={artistInfo?.name || 'Profile'}
          sx={{
            width: { xs: 36, md: 40 },
            height: { xs: 36, md: 40 },
            cursor: 'pointer',
            backgroundColor: getAvatarColor(),
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: { xs: 14, md: 16 },
          }}
        >
          {!getAvatarSrc() && getInitials()}
        </Avatar>
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



