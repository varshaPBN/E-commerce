import Head from 'next/head';
import { Box, Container, Grid, Button, Typography } from '@mui/material';

import ReviewPricingHeader from '@/components/review-pricing/ReviewPricingHeader';
import ProductDetailsCard from '@/components/review-pricing/ProductDetailsCard';
import PricingProfitCard from '@/components/review-pricing/PricingProfitCard';
import LivePreviewCard from '@/components/review-pricing/LivePreviewCard';

export default function ReviewPricing() {
  return (
    <>
      <Head>
        <title>Review & Pricing - Artloom</title>
        <meta name="description" content="Review and set pricing for your product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F7F3EB',
        }}
      >
        <ReviewPricingHeader />

        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          {/* Main Title */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Playfair Display'",
                fontSize: { xs: 32, md: 42 },
                fontWeight: 700,
                color: '#3B2A1A',
                mb: 1,
              }}
            >
              Review & Pricing
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 14, md: 16 },
                color: '#666',
              }}
            >
              Finalize your product details, set your profit margin and launch your creation
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Left Panel */}
            <Grid item xs={12} md={5}>
              <ProductDetailsCard />
              <PricingProfitCard />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#3B2A1A',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  borderRadius: '12px',
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#2A1F15',
                  },
                }}
              >
                Publish Product
              </Button>
            </Grid>

            {/* Right Panel */}
            <Grid item xs={12} md={7}>
              <LivePreviewCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

