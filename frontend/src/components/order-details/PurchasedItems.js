import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const items = [
  {
    image: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=Hoodie',
    brand: 'Bulk Order By Canvas Masters',
    name: 'Premium Cotton Canvas Pack',
    details: ['Size: 18x24', 'Texture: Fine Grain', 'Qty: 1'],
    price: '$45.00',
  },
  {
    image: 'https://via.placeholder.com/100x100/000000/FFFFFF?text=Record',
    brand: 'By Pigment Pro',
    name: 'Professional Acrylic Set',
    details: ['24 Colors', 'Qty: 1'],
    price: '$30.00',
  },
  {
    image: 'https://via.placeholder.com/100x100/F5DEB3/000000?text=Shoe',
    brand: 'By Studio Gear',
    name: 'Adjustable Wooden Easel',
    details: ['Material: Beechwood', 'Height: 72"', 'Qty: 1'],
    price: '$120.00',
  },
];

export default function PurchasedItems() {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Playfair Display'",
          fontSize: { xs: 20, md: 24 },
          fontWeight: 700,
          color: '#3B2A1A',
          mb: 3,
        }}
      >
        Purchased Items (3)
      </Typography>

      {items.map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            gap: 2,
            mb: index < items.length - 1 ? 3 : 0,
            pb: index < items.length - 1 ? 3 : 0,
            borderBottom: index < items.length - 1 ? '1px solid #E0E0E0' : 'none',
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 12,
                color: '#666',
                mb: 0.5,
              }}
            >
              {item.brand}
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                color: '#3B2A1A',
                mb: 1,
              }}
            >
              {item.name}
            </Typography>
            {item.details.map((detail, idx) => (
              <Typography
                key={idx}
                sx={{
                  fontSize: 14,
                  color: '#666',
                  mb: 0.5,
                }}
              >
                {detail}
              </Typography>
            ))}
            <Link
              href="#"
              sx={{
                fontSize: 14,
                color: '#3B2A1A',
                textDecoration: 'none',
                fontWeight: 600,
                mt: 1,
                display: 'inline-block',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Write a Review
            </Link>
          </Box>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            {item.price}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}



