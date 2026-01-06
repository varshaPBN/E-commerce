import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const products = [
  {
    name: 'Grey TShirt',
    image: 'https://via.placeholder.com/60x60/808080/FFFFFF?text=TS',
    sales: '42 sales this week',
    revenue: '$1890',
  },
  {
    name: 'Black Tote Bag',
    image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=TB',
    sales: '38 sales this week',
    revenue: '$684',
  },
  {
    name: 'Coffee Mug',
    image: 'https://via.placeholder.com/60x60/8B4513/FFFFFF?text=CM',
    sales: '20 sales this week',
    revenue: '$570',
  },
  {
    name: 'Black Cup',
    image: 'https://via.placeholder.com/60x60/000000/FFFFFF?text=BC',
    sales: '20 sales this week',
    revenue: '$300',
  },
  {
    name: 'Classic Red Hat',
    image: 'https://via.placeholder.com/60x60/FF0000/FFFFFF?text=RH',
    sales: '15 sales this week',
    revenue: '$270',
  },
];

export default function TopProducts({products = []}) {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #F0F0F0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
        Top Products
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {products.length > 0 ? (
        products.map((product, index) => (
          <Box
            key={product._id || index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              pb: 2.5,
              borderBottom: index < products.length - 1 ? '1px solid #F0F0F0' : 'none',
            }}
          >
            <Avatar
              src={product.design || 'https://via.placeholder.com/60x60'}
              alt={product.name}
              sx={{
                width: { xs: 50, md: 60 },
                height: { xs: 50, md: 60 },
                borderRadius: '8px',
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 600,
                  color: '#3B2A1A',
                  mb: 0.5,
                }}
              >
                {product.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 12, md: 14 },
                  color: '#666',
                }}
              >
                {product.soldQuantity || 0} sales
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                fontWeight: 700,
                color: '#3B2A1A',
              }}
            >
              ${product.revenue || '0.00'}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography sx={{ textAlign: 'center', py: 4, color: '#666' }}>
          No products yet
        </Typography>
      )}
      </Box>
    </Box>
  );
}



