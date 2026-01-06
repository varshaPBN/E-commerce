import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardGreeting from '@/components/dashboard/DashboardGreeting';
import KPICard from '@/components/dashboard/KPICard';
import RecentOrders from '@/components/dashboard/RecentOrders';
import TopProducts from '@/components/dashboard/TopProducts';
import { useState, useEffect } from 'react';
import theme from "@/theme/theme";
import { pink } from '@mui/material/colors';
import axios from 'axios';


export default function Dashboard() {
  const [artistInfo, setArtistInfo] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    analytics: null,
    recentOrders: [],
    topProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login-page';
          return;
        }
  
        // Configure axios defaults for this request
        const axiosConfig = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
  
        // Fetch all dashboard data in parallel
        const [profileRes, analyticsRes, ordersRes, productsRes] = await Promise.all([
          axios.get('/api/v1/artist/profile', axiosConfig),
          axios.get('/api/v1/artist/dashboard/analytics', axiosConfig),
          axios.get('/api/v1/artist/dashboard/recent-orders?limit=5', axiosConfig),
          axios.get('/api/v1/artist/dashboard/top-products?limit=5', axiosConfig),
        ]);
  
        if (profileRes.data.artist) {
          setArtistInfo(profileRes.data.artist);
        }
  
        if (analyticsRes.data.success) {
          setDashboardData(prev => ({
            ...prev,
            analytics: analyticsRes.data.analytics,
          }));
        }
  
        if (ordersRes.data.success) {
          setDashboardData(prev => ({
            ...prev,
            recentOrders: ordersRes.data.orders,
          }));
        }
  
        if (productsRes.data.success) {
          setDashboardData(prev => ({
            ...prev,
            topProducts: productsRes.data.products,
          }));
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login-page';
          return;
        }
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDashboardData();
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
        <DashboardGreeting artist={artistInfo?.name || 'Artist'} />


        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 3 ,bgcolor:'#F7F3EB'}}>
          {/* KPI Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="revenue"
                value={`$${dashboardData.analytics?.revenue?.value || '0.00'}`}
                change={dashboardData.analytics?.revenue?.change || '+0%'}
                changeType={dashboardData.analytics?.revenue?.changeType || 'neutral'}
                label="Total Revenue"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="orders"
                value={dashboardData.analytics?.orders?.value || '0'}
                change={dashboardData.analytics?.orders?.change || '+0%'}
                changeType={dashboardData.analytics?.orders?.changeType || 'neutral'}
                label="Total Orders"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                  type="visits"
                  value={dashboardData.analytics?.products?.value || '0'}
                  change={dashboardData.analytics?.products?.change || '+0%'}
                  changeType={dashboardData.analytics?.products?.changeType || 'neutral'}
                  label="Total Products"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <KPICard
                type="reviews"
                value={dashboardData.analytics?.reviews?.value || '0 New'}
                change={dashboardData.analytics?.reviews?.change || '0'}
                changeType={dashboardData.analytics?.reviews?.changeType || 'neutral'}
                label="Reviews"
              />
            </Grid>
          </Grid>



          {/* Recent Orders and Top Products */}
          <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
            <Grid item xs={12} lg={8}>
              <RecentOrders orders={dashboardData.recentOrders} />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TopProducts products={dashboardData.topProducts} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

