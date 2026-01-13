import React from 'react';
import { Box, Typography, Link, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function OrderSummary({ order }) {
  if (!order) return null;

  const itemsCount = order.items?.length || 0;
  const shippingAddress = order.shippingAddress || {};
  const paymentStatus = order.paymentStatus || 'pending';
  const paymentMethod = order.paymentMethod || 'online';

  return (
    <Box>
      {/* Financial Summary */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 3,
          mb: 3,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 20, md: 24 },
            fontWeight: 700,
            color: '#3B2A1A',
            mb: 2,
          }}
        >
          Financial Summary
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Subtotal ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
            ₹{order.subtotal?.toFixed(2) || '0.00'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Shipping
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
            ₹{order.shippingCharge?.toFixed(2) || '0.00'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Tax
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
            ₹{order.taxAmount?.toFixed(2) || '0.00'}
          </Typography>
        </Box>
        <Box
          sx={{
            borderTop: '2px solid #E0E0E0',
            pt: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Total Cost
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            ₹{order.totalAmount?.toFixed(2) || '0.00'}
          </Typography>
        </Box>
      </Box>

      {/* Shipping Details */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 3,
          mb: 3,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocalShippingIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 18, md: 20 },
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Shipping Details
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#3B2A1A', mb: 1 }}>
          {shippingAddress.name || 'N/A'}
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#666', mb: 1, lineHeight: 1.6 }}>
          {shippingAddress.address || ''}
          <br />
          {shippingAddress.city || ''}, {shippingAddress.state || ''} {shippingAddress.pincode || ''}
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#666' }}>
          {shippingAddress.phone || 'N/A'}
        </Typography>
      </Box>

      {/* Payment Method */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 3,
          mb: 3,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <CreditCardIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 18, md: 20 },
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Payment Method
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 600 }}>
            {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment (Razorpay)'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon
            sx={{
              color: paymentStatus === 'paid' ? '#4CAF50' : '#FF9800',
              fontSize: 16,
            }}
          />
          <Typography
            sx={{
              fontSize: 14,
              color: paymentStatus === 'paid' ? '#4CAF50' : '#FF9800',
              fontWeight: 600,
            }}
          >
            {paymentStatus === 'paid' ? 'Paid' : paymentStatus === 'pending' ? 'Pending' : 'Failed'}
          </Typography>
        </Box>
      </Box>

      {/* Order Issues */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 3,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SettingsIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 18, md: 20 },
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Order Issues?
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 14, color: '#666', mb: 2, lineHeight: 1.6 }}>
          Contact our artist support team for immediate assistance.
        </Typography>
        <Link
          href="#"
          sx={{
            fontSize: 14,
            color: '#3B2A1A',
            textDecoration: 'none',
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Visit Support Center
        </Link>
      </Box>
    </Box>
  );
}



