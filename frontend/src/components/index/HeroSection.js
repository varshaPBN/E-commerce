import React from 'react';
import { Box, Button, Typography, Container, Card } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HeroSection() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 36, md: 56, lg: 64 },
              fontWeight: 700,
              color: '#3B2A1A',
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Create & Sell Your <span style={{ fontSize: '1.1em' }}>Merchandise</span>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: '#666',
              lineHeight: 1.6,
              mb: 4,
              maxWidth: '600px',
            }}
          >
            Turn your creativity into products. Design, sell, and ship custom t-shirts, mug, hats and art prints without holding any inventory.
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            href="/sign-up"
            sx={{
              backgroundColor: '#3B2A1A',
              color: '#FFFFFF',
              textTransform: 'none',
              borderRadius: '999px',
              px: 4,
              py: 1.5,
              fontSize: 16,
              fontWeight: 500,
              mb: 4,
              '&:hover': { backgroundColor: '#2A1F15' },
            }}
          >
            Start Selling
          </Button>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, flexWrap: 'wrap' }}>
            {['Free to Use', 'Global Shipping', '24/7 Support'].map((feature) => (
              <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                <Typography sx={{ fontSize: 14, color: '#666' }}>{feature}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ position: 'relative', display: { xs: 'none', lg: 'block' }, height: '500px' }}>
          {[
            {
              top: 0,
              left: 0,
              width: '200px',
              rotate: '-5deg',
              z: 1,
              image: 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Painting',
              title: 'Artist Painting',
              price: '$24.00',
            },
            {
              top: '80px',
              left: '120px',
              width: '240px',
              rotate: '0deg',
              z: 2,
              image: 'https://via.placeholder.com/240x300/D2B48C/8B4513?text=Abstract+Soul',
              title: 'Abstract Soul',
              subtitle: 'Limited Edition Print',
              price: '$24.00',
            },
            {
              top: '150px',
              left: '240px',
              width: '200px',
              rotate: '5deg',
              z: 1,
              image: 'https://via.placeholder.com/200x300/BC9A6A/FFFFFF?text=Product',
              title: 'Product',
              price: '$24.00',
            },
          ].map((style, index) => (
            <Card
              key={index}
              sx={{
                position: 'absolute',
                top: style.top,
                left: style.left,
                width: style.width,
                borderRadius: '16px',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                zIndex: style.z,
                transform: `rotate(${style.rotate})`,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: index === 1 ? '300px' : '250px',
                  borderRadius: '16px 16px 0 0',
                }}
              >
                <Box
                  component="img"
                  src={style.image}
                  alt={style.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    p: 2,
                    borderRadius: '0 0 16px 16px',
                  }}
                >
                  <Typography sx={{ color: '#FFFFFF', fontSize: 12, fontWeight: 500 }}>{style.title}</Typography>
                  {style.subtitle && (
                    <Typography sx={{ color: '#FFFFFF', fontSize: 11, mt: 0.5 }}>{style.subtitle}</Typography>
                  )}
                  <Typography sx={{ color: '#FFFFFF', fontSize: 14, fontWeight: 600, mt: 1 }}>{style.price}</Typography>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

