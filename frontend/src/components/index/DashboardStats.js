import React from 'react';
import { Card, Box, Typography, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function DashboardStats() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card sx={{ borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 18, color: '#3B2A1A', mb: 0.5 }}>Store Overview</Typography>
                <Typography sx={{ fontSize: 12, color: '#666' }}>Last 30 days</Typography>
              </Box>
              <Chip
                icon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
                label="+24%"
                size="small"
                sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, fontSize: 10 }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
            <Box sx={{ backgroundColor: '#F8F8F8', borderRadius: '12px', p: 2 }}>
              <Typography sx={{ fontSize: 12, color: '#666', mb: 0.5 }}>Total Revenue</Typography>
              <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#3B2A1A' }}>$4,289.00</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#F8F8F8', borderRadius: '12px', p: 2 }}>
              <Typography sx={{ fontSize: 12, color: '#666', mb: 0.5 }}>Products Sold</Typography>
              <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#3B2A1A' }}>142</Typography>
            </Box>
          </Box>

          <Box sx={{ borderTop: '1px solid #E0E0E0', pt: 2 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#666', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Recent Orders
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { name: 'Limited Edition Tote', time: 'Just now', amount: '+$89.00', image: '/l1.png' },
                { name: 'Ceramic Art Plate', time: '2 mins ago', amount: '+$113.00', image: '/l2.png' },
              ].map((order, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    <Box
                      component="img"
                      src={order.image}
                      alt={order.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#3B2A1A', mb: 0.25 }}>{order.name}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#666' }}>{order.time}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#2E7D32' }}>{order.amount}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Card>

      <Card
        sx={{
          position: 'absolute',
          bottom: -20,
          right: -20,
          borderRadius: '12px',
          backgroundColor: '#E8F5E9',
          p: 2,
          boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          minWidth: '200px',
        }}
      >
        <AttachMoneyIcon sx={{ color: '#2E7D32', fontSize: 24 }} />
        <Box>
          <Typography sx={{ fontSize: 11, color: '#2E7D32', fontWeight: 500, mb: 0.25 }}>You just got paid</Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#8B4513' }}>$113.00</Typography>
        </Box>
      </Card>
    </Box>
  );
}



