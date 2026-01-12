import React from 'react';
import { Box, Typography } from '@mui/material';

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
  // Get product preview image based on category
  const getCategoryImage = (cat) => {
    const categoryImages = {
      'Tshirt': 'https://images.unsplash.com/photo-1651761179569-4ba2aa054997?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Hat': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Hats': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Mug': 'https://images.unsplash.com/photo-1650959858546-d09833d5317b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Bag': 'https://images.unsplash.com/photo-1732963947955-858ad7d5e540?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Bags': 'https://images.unsplash.com/photo-1732963947955-858ad7d5e540?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    return categoryImages[cat] || categoryImages['Tshirt'];
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #F0F0F0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        //ml:'auto'
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5,ml:100}}>
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
            <Box
              sx={{
                position: 'relative',
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: '#F5F5F5',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {/* Base Product Image */}
              <Box
                component="img"
                src={getCategoryImage(product.category || 'Tshirt')}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
              {/* Design Overlay */}
              {product.design && (
                <Box
                  component="img"
                  src={product.design}
                  alt="Design"
                  sx={{
                    maxWidth: '55%',
                    maxHeight: '55%',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    mixBlendMode: 'multiply',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                  }}
                />
              )}
            </Box>
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



