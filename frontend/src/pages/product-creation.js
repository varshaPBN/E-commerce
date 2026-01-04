import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import DesignHeader from '@/components/design/DesignHeader';
import ProductDetailsPanel from '@/components/design/ProductDetailsPanel';
import ProductPreviewPanel from '@/components/design/ProductPreviewPanel';

export default function ProductCreation() {
  return (
    <>
      <Head>
        <title>Design - Artloom</title>
        <meta name="description" content="Create and design your custom products" />
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
        <DesignHeader />
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          <Grid container spacing={3}>
            {/* Left Panel - Product Details */}
            <Grid item xs={12} md={4}>
              <ProductDetailsPanel />
            </Grid>

            {/* Right Panel - Product Preview */}
              <Grid item xs={12} md={8}>
              <ProductPreviewPanel />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

