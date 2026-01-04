import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import OrderDetailsHeader from '@/components/order-details/OrderDetailsHeader';
import OrderHeader from '@/components/order-details/OrderHeader';
import OrderTimeline from '@/components/order-details/OrderTimeline';
import PurchasedItems from '@/components/order-details/PurchasedItems';
import OrderSummary from '@/components/order-details/OrderSummary';
import OrderDetailsFooter from '@/components/order-details/OrderDetailsFooter';

export default function OrderDetails() {
  return (
    <>
      <Head>
        <title>Order Details - Artloom</title>
        <meta name="description" content="View your order details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F7F3EB',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <OrderDetailsHeader />

        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4, flex: 1 }}>
          <OrderHeader />
          <OrderTimeline />

          <Grid container spacing={3}>
            {/* Left Column - Purchased Items */}
            <Grid item xs={12} md={7}>
              <PurchasedItems />
            </Grid>

            {/* Right Column - Order Summary */}
            <Grid item xs={12} md={5}>
              <OrderSummary />
            </Grid>
          </Grid>
        </Container>

        <OrderDetailsFooter />
      </Box>
    </>
  );
}



