import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

export default function ProductDetailsCard({ productTitle, setProductTitle, description, setDescription }) {
  // Use provided props or default values
  const title = productTitle !== undefined ? productTitle : 'Classic Cotton T-Shirt';
  const desc = description !== undefined ? description : 'A classic white T-shirt made from soft, comfortable fabric with a clean, timeless fit. Perfect for everyday wear';

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AssignmentIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 18, md: 20 },
            fontWeight: 700,
            color: '#3B2A1A',
          }}
        >
          Product Details
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            mb: 1,
            textTransform: 'uppercase',
          }}
        >
          Product Title
        </Typography>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setProductTitle && setProductTitle(e.target.value)}
          sx={{
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
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            mb: 1,
            textTransform: 'uppercase',
          }}
        >
          Description
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={desc}
          onChange={(e) => setDescription && setDescription(e.target.value)}
          sx={{
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
      </Box>
    </Box>
  );
}

