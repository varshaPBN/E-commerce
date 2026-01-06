import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const iconMap = {
  revenue: BarChartIcon,
  orders: ShoppingBagIcon,
  visits: InventoryIcon,
  reviews: ThumbUpIcon,
};

export default function KPICard({ type, value, change, changeType, label }) {
  const Icon = iconMap[type];

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid #F0F0F0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Icon
          sx={{
            color: '#3B2A1A',
            fontSize: 32,
          }}
        />
        <Chip
          label={change}
          size="small"
          sx={{
            backgroundColor:
              changeType === 'positive'
                ? '#E8F5E9'
                : changeType === 'negative'
                ? '#FFEBEE'
                : '#F5F5F5',
            color:
              changeType === 'positive'
                ? '#4CAF50'
                : changeType === 'negative'
                ? '#F44336'
                : '#666',
            fontSize: 12,
            fontWeight: 600,
            height: 24,
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: { xs: 20, md: 28 },
            fontWeight: 700,
            color: '#3B2A1A',
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: '#666',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}



