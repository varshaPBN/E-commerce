import Head from 'next/head';
import { Box, Container, Grid, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken } from '@/utils/auth';
import ProductsHeader from '@/components/common/ProductsHeader';
import OrderHeader from '@/components/order-details/OrderHeader';
import OrderTimeline from '@/components/order-details/OrderTimeline';
import PurchasedItems from '@/components/order-details/PurchasedItems';
import OrderSummary from '@/components/order-details/OrderSummary';
import OrderDetailsFooter from '@/components/order-details/OrderDetailsFooter';

export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const token = getAuthToken();
        if (!token) {
          setError('Please login to view order details');
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/v1/get/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F7F3EB',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F7F3EB',
          px: 4,
        }}
      >
        <Alert severity="error">{error || 'Order not found'}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Order Details - ArtisanMerch</title>
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
        <ProductsHeader />

        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4, flex: 1 }}>
          <OrderHeader order={order} />
          <OrderTimeline order={order} />

          <Grid container spacing={3}>
            {/* Left Column - Purchased Items */}
            <Grid item xs={12} md={7}>
              <PurchasedItems order={order} />
            </Grid>

            {/* Right Column - Order Summary */}
            <Grid item xs={12} md={5}>
              <OrderSummary order={order} />
            </Grid>
          </Grid>
        </Container>

        <OrderDetailsFooter />
      </Box>
    </>
  );
}



