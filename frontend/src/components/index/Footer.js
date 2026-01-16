import React from 'react';
import { Box, Typography, Container, IconButton } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
  const socialIcons = [{ icon: TwitterIcon }, { icon: InstagramIcon }, { icon: FacebookIcon }];

  return (
    <Box sx={{ backgroundColor: '#FDF8F2', borderTop: '1px solid rgba(59, 42, 26, 0.1)', py: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
          }}
        >
          <Typography sx={{ fontSize: 12, color: '#666' }}>
            © 2025 Artloom Inc. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#3B2A1A', textTransform: 'uppercase' }}>
              Contact Us
            </Typography>
            <Typography sx={{ fontSize: 12, color: '#666' }}>+1 (555) 123-4567</Typography>
            <Typography sx={{ fontSize: 12, color: '#666' }}>support@artloom.com</Typography>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}



