import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function PlatformLogos() {
  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Behance'];

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, backgroundColor: '#FDF8F2' }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#666',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 1,
            mb: 3,
          }}
        >
          Empowering Creators From
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 3, md: 6 }, flexWrap: 'wrap' }}>
          {platforms.map((platform, index) => (
            <Typography key={index} sx={{ fontSize: 18, fontWeight: 600, color: '#3B2A1A', opacity: 0.7 }}>
              {platform}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}




