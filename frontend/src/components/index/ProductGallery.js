import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductGallery() {
  const products = [
    {
      image: '/image 60.png',
      alt: 'Custom T-Shirt with embroidery',
    },
    {
      image: '/image 62.png',
      alt: 'Painted cowboy hat with sunflowers',
    },
    {
      image: '/image 64.png',
      alt: 'Canvas tote bags',
    },
    {
      image: '/image 65.png',
      alt: 'White mugs with heart patterns',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 32, md: 42 },
              fontWeight: 700,
              color: '#3B2A1A',
              mb: 2,
            }}
          >
            What can you sell?
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: '#666',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            From wardrobe staples to home decor, put your art on products people use everyday.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)'
            },
            gap: 4,
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={index} image={product.image} alt={product.alt} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

