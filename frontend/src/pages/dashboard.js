import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardGreeting from '@/components/dashboard/DashboardGreeting';
import KPICard from '@/components/dashboard/KPICard';
import RecentOrders from '@/components/dashboard/RecentOrders';
import TopProducts from '@/components/dashboard/TopProducts';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [artistInfo, setArtistInfo] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchArtistInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust key name if different
        if (!token) {
          // Redirect to login if no token
          window.location.href = '/login-page';
          return;
        }

        const response = await fetch('http://localhost:5001/api/v1/artist/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          // Token invalid, redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login-page';
          return;
        }

        const data = await response.json();
        if (data.artist) {
          setArtistInfo(data.artist);
        }
      } catch (error) {
        console.error('Error fetching artist info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistInfo();
  }, []);

  if (loading) {
    return <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</Box>;
  }
  return (
    <>
      <Head>
        <title>Dashboard - Artloom</title>
        <meta name="description" content="Your Artloom store dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#FAFAFA',
        }}
      >
        <DashboardHeader />
        <DashboardGreeting />

        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          {/* KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="revenue"
                value="$4289.00"
                change="+12.5%"
                changeType="positive"
                label="Total Revenue"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="orders"
                value="156"
                change="+5.2%"
                changeType="positive"
                label="Total Orders"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="visits"
                value="8942"
                change="+12.5%"
                changeType="negative"
                label="Store Visits"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="reviews"
                value="28 New"
                change="4.9 Avg"
                changeType="neutral"
                label="Reviews"
              />
            </Grid>
          </Grid>

          {/* Recent Orders and Top Products */}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <RecentOrders />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TopProducts />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

