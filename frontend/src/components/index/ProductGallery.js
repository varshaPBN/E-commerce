import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';

export default function ProductGallery() {
  const products = [
    {
      image: 'https://via.placeholder.com/400x500/000000/FFFFFF?text=T-Shirt+Design',
      alt: 'Custom T-Shirt with embroidery',
    },
    {
      image: 'https://via.placeholder.com/400x500/FFFFFF/8B4513?text=Cowboy+Hat',
      alt: 'Painted cowboy hat with sunflowers',
    },
    {
      image: 'https://via.placeholder.com/400x500/FFD700/8B4513?text=Tote+Bags',
      alt: 'Canvas tote bags',
    },
    {
      image: 'https://via.placeholder.com/400x500/FFFFFF/8B4513?text=Mugs',
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
        <Grid container spacing={4}>
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProductCard image={product.image} alt={product.alt} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

