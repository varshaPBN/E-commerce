import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function OrderTimeline() {
  const steps = [
    { label: 'Order Placed', date: 'Oct 24, 10:42 AM', completed: true },
    { label: 'Processing', date: 'Oct 25, 09:35 AM', completed: true },
    { label: 'Shipped', date: 'Oct 26, 02:30 PM', completed: true, tracking: 'FedEx Tracking: 78239120' },
    { label: 'Delivered', date: '', completed: false },
  ];

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
            key={index}
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
              {step.tracking && (
                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#3B2A1A',
                    textAlign: 'center',
                    mt: 0.5,
                    fontWeight: 600,
                  }}
                >
                  {step.tracking}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

