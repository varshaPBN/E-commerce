import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockIcon from '@mui/icons-material/Lock';

export default function LivePreviewCard({ category, designFile, productTitle, selectedColor: propSelectedColor }) {
  const [designSize, setDesignSize] = useState(50); // Default 50%
  const [designPosition, setDesignPosition] = useState({ top: 50, left: 50 }); // Default center position
  const [selectedColor, setSelectedColor] = useState(propSelectedColor || 'black'); // Store color in state

  useEffect(() => {
    // Get design size and position from localStorage
    const productData = localStorage.getItem('productCreationData');
    if (productData) {
      const parsed = JSON.parse(productData);
      if (parsed.designSize !== undefined) {
        setDesignSize(parsed.designSize);
      }
      if (parsed.designPosition) {
        setDesignPosition(parsed.designPosition);
      }
      // Also get color from localStorage on mount if prop not provided
      if (!propSelectedColor && parsed.selectedColor) {
        setSelectedColor(parsed.selectedColor);
      }
    }
  }, [propSelectedColor]);

  // Update color when prop changes
  useEffect(() => {
    if (propSelectedColor) {
      setSelectedColor(propSelectedColor);
    }
  }, [propSelectedColor]);
  
  // Get product preview image based on category and color
  const getCategoryImage = (cat, color = 'black') => {
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
    if (categoryImages[cat] && categoryImages[cat][color]) {
      return categoryImages[cat][color];
    }
    // Fallback to black if color doesn't exist
    if (categoryImages[cat] && categoryImages[cat]['black']) {
      return categoryImages[cat]['black'];
    }
    // Fallback to white if black doesn't exist
    if (categoryImages[cat] && categoryImages[cat]['white']) {
      return categoryImages[cat]['white'];
    }
    // Fallback to Tshirt black if category doesn't exist
    return categoryImages['Tshirt']?.['black'] || '/tshirt/black.png';
  };

  const previewImage = getCategoryImage(category || 'Tshirt', selectedColor);
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        height: 'fit-content',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VisibilityIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 18, md: 20 },
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Live Preview
          </Typography>
        </Box>
        <IconButton
          sx={{
            color: '#3B2A1A',
            '&:hover': {
              backgroundColor: 'rgba(59, 42, 26, 0.1)',
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

        <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 4,
          textAlign: 'center',
          mb: 2,
          height: '600px',
          width: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Product Base Image */}
          <Box
            component="img"
            src={previewImage}
            alt="Product Preview"
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
          {/* Uploaded Design Overlay */}
          {designFile && (
            <Box
              component="img"
              src={designFile}
              alt="Design Overlay"
              sx={{
                maxWidth: `${designSize}%`,
                maxHeight: `${designSize}%`,
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                position: 'absolute',
                top: `${designPosition.top}%`,
                left: `${designPosition.left}%`,
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
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 0.5,
          mt: 2,
        }}
      >
        <LockIcon sx={{ fontSize: 16, color: '#666' }} />
        <Typography
          sx={{
            fontSize: 12,
            color: '#666',
          }}
        >
          Your design is protected until you publish
        </Typography>
      </Box>
    </Box>
  );
}

