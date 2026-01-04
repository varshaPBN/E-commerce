import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';

export default function CTASection() {
  return (
    <Box sx={{ backgroundColor: '#3B2A1A', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 32, md: 48 },
            fontWeight: 700,
            color: '#FFFFFF',
            mb: 3,
          }}
        >
          Ready to Monetize Your Art?
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 16, md: 18 },
            color: '#FFFFFF',
            opacity: 0.9,
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          Join 50,000+ creators selling their unique merchandise, Setup is free, easy, and takes less than 5 minutes.
        </Typography>
        <Button
          variant="contained"
          href="/sign-up"
          sx={{
            backgroundColor: '#FDF8F2',
            color: '#3B2A1A',
            textTransform: 'none',
            borderRadius: '999px',
            px: 5,
            py: 1.5,
            fontSize: 16,
            fontWeight: 600,
            '&:hover': { backgroundColor: '#F6EEE4' },
          }}
        >
          Start Selling for Free
        </Button>
      </Container>
    </Box>
  );
}

