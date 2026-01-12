import React from 'react';
import { Box, Typography } from '@mui/material';

export default function TopProducts({products = []}) {
  // Get product preview image based on category and color
  const getCategoryImage = (category, color = 'black') => {
    // Map backend color names (capitalized) to lowercase for image paths
    const colorMap = {
      'White': 'white',
      'Black': 'black',
      'Red': 'red',
      'Blue': 'blue',
    };
    // Handle both backend format (capitalized) and lowercase format
    const normalizedColor = typeof color === 'string' ? color.trim() : 'black';
    const colorKey = colorMap[normalizedColor] || normalizedColor.toLowerCase() || 'black';
    
    const categoryImages = {
      'Tshirt': {
        'white': '/tshirt/white.png',
        'black': '/tshirt/black.png',
        'red'  : '/tshirt/red.png',
        'blue' : '/tshirt/blue.png'
      },
      'Hat': {
        'white': '/hat/white.png',
        'black': '/hat/black.png',
        'red'  : '/hat/red.png',
        'blue' : '/hat/blue.png'
      },
      'Mug': {
        'white': '/mug/white.png',
        'black': '/mug/black.png',
        'red'  : '/mug/red.png',
        'blue' : '/mug/blue.png',
      },
      'Bag': {
        'white': '/bag/white.png',
        'black': '/bag/black.png',
        'red'  : '/bag/red.png',
        'blue' : '/bag/blue.png',
      },
    };
    
    // If category exists and has color options
    if (categoryImages[category] && categoryImages[category][colorKey]) {
      return categoryImages[category][colorKey];
    }
    // Fallback to black if color doesn't exist
    if (categoryImages[category] && categoryImages[category]['black']) {
      return categoryImages[category]['black'];
    }
    // Fallback to white if black doesn't exist
    if (categoryImages[category] && categoryImages[category]['white']) {
      return categoryImages[category]['white'];
    }
    // Fallback to Tshirt black if category doesn't exist
    return categoryImages['Tshirt']?.['black'] || '/tshirt/black.png';
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Base Product Image */}
              <Box
                component="img"
                src={getCategoryImage(
                  product.category || 'Tshirt',
                  (product.colors && Array.isArray(product.colors) && product.colors.length > 0) 
                    ? product.colors[0] 
                    : 'Black' // Default to 'Black' (backend format) if no color
                )}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  borderRadius: '8px',
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
                    maxWidth: '50%', // Default size matching preview (50%)
                    maxHeight: '50%', // Default size matching preview (50%)
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    position: 'absolute',
                    top: '50%', // Default center position
                    left: '50%', // Default center position
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    pointerEvents: 'none',
                    mixBlendMode: 'multiply',
                    transition: 'top 0.2s ease, left 0.2s ease, max-width 0.2s ease, max-height 0.2s ease',
                    outline: 'none !important',
                    border: 'none !important',
                    boxShadow: 'none !important',
                    filter: 'none',
                    WebkitFilter: 'none',
                    '&::before': {
                      display: 'none',
                    },
                    '&::after': {
                      display: 'none',
                    },
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



