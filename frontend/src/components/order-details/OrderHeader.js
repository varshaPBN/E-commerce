import React from 'react';
import { Box, Typography, Button, Chip, Breadcrumbs, Link } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const getStatusColor = (status) => {
  const statusMap = {
    pending: '#FF9800',
    confirmed: '#2196F3',
    processing: '#2196F3',
    shipped: '#4CAF50',
    delivered: '#4CAF50',
    cancelled: '#F44336',
  };
  return statusMap[status] || '#666';
};

const getStatusLabel = (status) => {
  return status ? status.toUpperCase() : 'PENDING';
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function OrderHeader({ order }) {
  if (!order) return null;

  const orderDate = formatDate(order.createdAt);
  const deliveryDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator="/"
        sx={{ mb: 3, fontSize: 14 }}
        aria-label="breadcrumb"
      >
        <Link
          href="/"
          sx={{
            color: '#666',
            textDecoration: 'none',
            fontSize: 14,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Home
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
          Orders
        </Link>
        <Typography sx={{ color: '#3B2A1A', fontSize: 14 }}>
          Order #{order.orderNumber}
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
              Order #{order.orderNumber}
            </Typography>
            <Chip
              label={getStatusLabel(order.orderStatus)}
              sx={{
                backgroundColor: getStatusColor(order.orderStatus),
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
            Placed on {orderDate}
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
      {deliveryDate && (
        <Typography
          sx={{
            fontSize: 14,
            color: '#666',
            mb: 3,
          }}
        >
          Estimated Delivery: {deliveryDate}
        </Typography>
      )}
    </Box>
  );
}



