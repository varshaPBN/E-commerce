import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function OrderTimeline({ order }) {
  if (!order) return null;

  const orderStatus = order.orderStatus || 'pending';
  const orderDate = formatDate(order.createdAt);

  const getSteps = () => {
    const allSteps = [
      { key: 'pending', label: 'Order Placed', date: orderDate, completed: true },
      { key: 'confirmed', label: 'Confirmed', date: '', completed: false },
      { key: 'processing', label: 'Processing', date: '', completed: false },
      { key: 'shipped', label: 'Shipped', date: '', completed: false },
      { key: 'delivered', label: 'Delivered', date: '', completed: false },
    ];

    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(orderStatus);

    return allSteps.map((step, index) => {
      const stepIndex = statusOrder.indexOf(step.key);
      const completed = stepIndex <= currentIndex && currentIndex >= 0;
      return {
        ...step,
        completed,
        date: completed && step.key === orderStatus ? orderDate : (step.date || ''),
      };
    });
  };

  const steps = getSteps();

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        mb: 3,
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {steps.map((step, index) => (
          <Box
            key={step.key || index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {index < steps.length - 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: '60%',
                  right: '-40%',
                  height: '2px',
                  backgroundColor: step.completed ? '#3B2A1A' : '#E0E0E0',
                  zIndex: 0,
                }}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 1,
                position: 'relative',
                zIndex: 2,
              }}
            >
              {step.completed ? (
                <CheckCircleIcon
                  sx={{
                    color: '#3B2A1A',
                    fontSize: 32,
                    mb: 0.5,
                    backgroundColor: '#FFFFFF',
                  }}
                />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    color: '#E0E0E0',
                    fontSize: 32,
                    mb: 0.5,
                    backgroundColor: '#FFFFFF',
                  }}
                />
              )}
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: step.completed ? '#3B2A1A' : '#999',
                  textAlign: 'center',
                  mb: 0.5,
                }}
              >
                {step.label}
              </Typography>
              {step.date && (
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#666',
                    textAlign: 'center',
                  }}
                >
                  {step.date}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

