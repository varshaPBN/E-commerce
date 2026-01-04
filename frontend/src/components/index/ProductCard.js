import React from 'react';
import { Card, Box } from '@mui/material';

const ProductCard = ({ image, alt }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={alt}
        sx={{
          width: '100%',
          height: { xs: '250px', md: '350px' },
          objectFit: 'cover',
        }}
      />
    </Card>
  );
};

export default ProductCard;



