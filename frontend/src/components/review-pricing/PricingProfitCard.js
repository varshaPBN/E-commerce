import React, { useState } from 'react';
import { Box, Typography, TextField, Slider } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function PricingProfitCard() {
  const [sellingPrice, setSellingPrice] = useState(35.0);
  const baseCost = 15.5;
  const profit = sellingPrice - baseCost;
  const [profitMargin, setProfitMargin] = useState(50);

  const handlePriceChange = (newPrice) => {
    setSellingPrice(newPrice);
    const newMargin = ((newPrice - baseCost) / newPrice) * 100;
    setProfitMargin(Math.max(0, Math.min(100, newMargin)));
  };

  const handleMarginChange = (newMargin) => {
    setProfitMargin(newMargin);
    const newPrice = baseCost / (1 - newMargin / 100);
    setSellingPrice(newPrice);
  };

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <AttachMoneyIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 18, md: 20 },
            fontWeight: 700,
            color: '#3B2A1A',
          }}
        >
          Pricing & Profit
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#3B2A1A',
              textTransform: 'uppercase',
            }}
          >
            SELLING PRICE
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              value={`$ ${sellingPrice.toFixed(2)}`}
              onChange={(e) => {
                const value = parseFloat(e.target.value.replace('$ ', '')) || 0;
                handlePriceChange(value);
              }}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#E0E0E0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#3B2A1A',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3B2A1A',
                  },
                },
              }}
            />
            <Typography sx={{ fontSize: 18, color: '#3B2A1A', fontWeight: 600 }}>-</Typography>
            <Box
              sx={{
                backgroundColor: '#E0E0E0',
                borderRadius: '8px',
                px: 2,
                py: 1,
                minWidth: 100,
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: 14, color: '#3B2A1A', fontWeight: 600 }}>
                $ {baseCost.toFixed(2)}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 18, color: '#3B2A1A', fontWeight: 600 }}>=</Typography>
            <Box
              sx={{
                backgroundColor: '#C8E6C9',
                borderRadius: '8px',
                px: 2,
                py: 1,
                minWidth: 100,
                textAlign: 'center',
              }}
            >
              <Typography sx={{ fontSize: 14, color: '#2E7D32', fontWeight: 600 }}>
                $ {profit.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: '#3B2A1A',
              mb: 1.5,
              textTransform: 'uppercase',
            }}
          >
            Adjust profit margin
          </Typography>
          <Slider
            value={profitMargin}
            onChange={(e, newValue) => handleMarginChange(newValue)}
            min={0}
            max={100}
            sx={{
              color: '#3B2A1A',
              '& .MuiSlider-thumb': {
                backgroundColor: '#3B2A1A',
                width: 20,
                height: 20,
                '&:hover': {
                  boxShadow: '0px 0px 0px 8px rgba(59, 42, 26, 0.16)',
                },
              },
              '& .MuiSlider-track': {
                backgroundColor: '#3B2A1A',
                height: 4,
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#E0E0E0',
                height: 4,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

