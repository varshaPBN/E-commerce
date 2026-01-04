import React from 'react';
import { Box, Typography, Button, Chip, Breadcrumbs, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';

export default function OrderHeader() {
  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator="/"
        sx={{ mb: 3, fontSize: 14 }}
        aria-label="breadcrumb"
      >
        <Link
          href="#"
          sx={{
            color: '#666',
            textDecoration: 'none',
            fontSize: 14,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Studio Dashboard
        </Link>
        <Link
          href="#"
          sx={{
            color: '#666',
            textDecoration: 'none',
            fontSize: 14,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Supply Orders
        </Link>
        <Typography sx={{ color: '#3B2A1A', fontSize: 14 }}>
          Order #ORD-7782-XJ
        </Typography>
      </Breadcrumbs>

      {/* Order Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          mb: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography
              sx={{
                fontFamily: "'Playfair Display'",
                fontSize: { xs: 28, md: 36 },
                fontWeight: 700,
                color: '#3B2A1A',
              }}
            >
              Order #ORD-7782-XJ
            </Typography>
            <Chip
              label="SHIPPED"
              sx={{
                backgroundColor: '#4CAF50',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 12,
                height: 28,
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 14,
              color: '#666',
            }}
          >
            Placed on October 24, 2023 at 10:42 AM
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: { xs: 2, md: 0 },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: '#3B2A1A',
              color: '#3B2A1A',
              textTransform: 'none',
              borderRadius: '8px',
              px: 2,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#2A1F15',
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            Download Invoice
          </Button>
          <Button
            variant="outlined"
            startIcon={<HelpOutlineIcon />}
            sx={{
              borderColor: '#3B2A1A',
              color: '#3B2A1A',
              textTransform: 'none',
              borderRadius: '8px',
              px: 2,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#2A1F15',
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            Order Support
          </Button>
        </Box>
      </Box>

      {/* Estimated Delivery */}
      <Typography
        sx={{
          fontSize: 14,
          color: '#666',
          mb: 3,
        }}
      >
        Estimated Delivery: Monday, Oct 28, 2023
      </Typography>
    </Box>
  );
}



