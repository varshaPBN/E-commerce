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
  
        // Fetch all dashboard data in parallel with individual error handling
        const [profileRes, analyticsRes, ordersRes, productsRes] = await Promise.allSettled([
          axios.get('/api/v1/artist/profile', axiosConfig),
          axios.get('/api/v1/artist/dashboard/analytics', axiosConfig),
          axios.get('/api/v1/artist/dashboard/recent-orders?limit=5', axiosConfig),
          axios.get('/api/v1/artist/products/view', axiosConfig),
        ]);
  
        // Handle profile response
        if (profileRes.status === 'fulfilled' && profileRes.value?.data?.artist) {
          setArtistInfo(profileRes.value.data.artist);
        } else if (profileRes.status === 'rejected') {
          console.error('❌ PROFILE ERROR:', profileRes.reason);
          console.error('Status:', profileRes.reason?.response?.status);
          console.error('Message:', profileRes.reason?.response?.data?.message);
          console.error('Full error:', profileRes.reason?.response?.data);
        }
   
        // Handle analytics response
        if (analyticsRes.status === 'fulfilled' && analyticsRes.value?.data?.success) {
          setDashboardData(prev => ({
            ...prev,
            analytics: analyticsRes.value.data.analytics,
          }));
        } else if (analyticsRes.status === 'rejected') {
          console.error('❌ ANALYTICS ERROR:', analyticsRes.reason);
          console.error('Status:', analyticsRes.reason?.response?.status);
          console.error('Message:', analyticsRes.reason?.response?.data?.message);
          console.error('Full error:', analyticsRes.reason?.response?.data);
        }
   
        // Handle orders response
        if (ordersRes.status === 'fulfilled' && ordersRes.value?.data?.success) {
          setDashboardData(prev => ({
            ...prev,
            recentOrders: ordersRes.value.data.orders,
          }));
        } else if (ordersRes.status === 'rejected') {
          console.error('❌ ORDERS ERROR:', ordersRes.reason);
          console.error('Status:', ordersRes.reason?.response?.status);
          console.error('Message:', ordersRes.reason?.response?.data?.message);
          console.error('Full error:', ordersRes.reason?.response?.data);
        }
  
        // Handle products response
        if (productsRes.status === 'fulfilled' && productsRes.value?.data?.products) {
          // Map products to match TopProducts component expectations
          const mappedProducts = productsRes.value.data.products
            .slice(0, 5) // Limit to top 5 products
            .map(product => ({
              _id: product._id,
              name: product.name,
              design: product.design,
              category: product.category,
              colors: product.colors || [], // Include colors array
              soldQuantity: product.soldQuantity || 0,
              revenue: product.revenue || (product.price * (product.soldQuantity || 0)).toFixed(2),
            }));
          
          setDashboardData(prev => ({
            ...prev,
            topProducts: mappedProducts,
          }));
        } else if (productsRes.status === 'rejected') {
          console.error('Error fetching products:', productsRes.reason);
          console.error('Error details:', {
            message: productsRes.reason?.message,
            response: productsRes.reason?.response?.data,
            status: productsRes.reason?.response?.status,
          });
          // Set empty array on error so component doesn't break
          setDashboardData(prev => ({
            ...prev,
            topProducts: [],
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login-page';
          return;
        }
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
        <DashboardHeader artistInfo={artistInfo} />
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

