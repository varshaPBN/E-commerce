import React from 'react';
import { Box } from '@mui/material';

export default function DecorativeImages() {
  const images = [
    { src: 'https://via.placeholder.com/120x120/4A4A4A/FFFFFF?text=Mug', top: 0, left: 0, rotate: -5, z: 1 },
    { src: 'https://via.placeholder.com/120x120/D0D0D0/666666?text=Mug', top: 15, left: 70, rotate: 3, z: 2 },
    { src: 'https://via.placeholder.com/120x120/F5F5DC/666666?text=Mug', top: 30, left: 140, rotate: -2, z: 1 },
    { src: 'https://via.placeholder.com/120x120/FFB6C1/FFFFFF?text=Cap', top: 180, left: 30, rotate: 5, z: 2 },
    { src: 'https://via.placeholder.com/180x180/FFFFFF/000000?text=T-Shirt', top: 160, left: 120, rotate: -3, z: 3 },
    { src: 'https://via.placeholder.com/160x100/F5F5DC/666666?text=Prints', top: 320, left: 80, rotate: 2, z: 1 },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '300px', md: '500px' },
        width: '100%',
        mt: 2,
        display: { xs: 'none', lg: 'block' },
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: `${img.top}px`,
            left: `${img.left}px`,
            transform: `rotate(${img.rotate}deg)`,
            width: img.src.includes('T-Shirt') ? '180px' : img.src.includes('Prints') ? '160px' : '120px',
            height: img.src.includes('T-Shirt') ? '180px' : img.src.includes('Prints') ? '100px' : '120px',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.1)',
            backgroundColor: '#FFFFFF',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Box
            component="img"
            src={img.src}
            alt={`Decorative ${index + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

