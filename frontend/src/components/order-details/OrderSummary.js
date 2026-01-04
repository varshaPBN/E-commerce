import React from 'react';
import { Box, Typography, Link, Chip } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function OrderSummary() {
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
            Subtotal (3 items)
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
            $195.00
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Shipping
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
            $15.00
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Tax
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 500 }}>
            $16.80
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Artist Discount (PRO)
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#4CAF50', fontWeight: 500 }}>
            -$10.00
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
            $216.80
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
          Alex Morgan
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#666', mb: 1, lineHeight: 1.6 }}>
          123 Creator Lane, Apt 4B
          <br />
          Beverly Hills, Los Angeles, CA 90210
          <br />
          United States
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#666' }}>
          +1(555)123-4567
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
            Business Card ••8842
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#666' }}>
            Exp: 12/25
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 16 }} />
          <Typography sx={{ fontSize: 14, color: '#4CAF50', fontWeight: 600 }}>
            Paid
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



