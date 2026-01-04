import React from 'react';
import { Box, Typography, Container, Card, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardStats from './DashboardStats';

export default function FeatureSteps() {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FDF8F2' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6, alignItems: 'center' }}>
          <Box>
            <Chip
              label="EASY SETUP"
              size="small"
              sx={{ backgroundColor: '#E8D4F0', color: '#3B2A1A', fontWeight: 600, fontSize: 10, mb: 2 }}
            />
            <Typography
              sx={{
                fontFamily: "'Playfair Display'",
                fontSize: { xs: 32, md: 42 },
                fontWeight: 700,
                color: '#3B2A1A',
                mb: 3,
              }}
            >
              Launch Your Store In Minutes, Not Days
            </Typography>
            <Typography sx={{ fontSize: 16, color: '#666', lineHeight: 1.6, mb: 4 }}>
              We handle printing, shipping, and customer service. You focus on creating amazing designs and engaging with your fans.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                {
                  number: '1',
                  title: 'Upload Your Designs',
                  description: 'Simply upload your artwork. Our mock-up generator instantly shows how it looks on real products.',
                },
                {
                  number: '2',
                  title: 'Customize Your Storefront',
                  description: 'Create a beautiful online store that matches your brand aesthetic. No coding required.',
                },
                {
                  number: '3',
                  title: 'Start Selling & Earning',
                  description: 'Share your store link. When a sale is made, we print, pack, and ship it. You get paid instantly.',
                },
              ].map((step, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#3B2A1A',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  >
                    {step.number}
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 18, color: '#3B2A1A', mb: 1 }}>{step.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{step.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <DashboardStats />
        </Box>
      </Container>
    </Box>
  );
}

