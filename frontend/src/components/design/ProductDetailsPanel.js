import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function ProductDetailsPanel() {
  const [category, setCategory] = useState('Apparel');
  const [product, setProduct] = useState('Classic Cotton T-Shirt');
  const [selectedColor, setSelectedColor] = useState('white');
  const [view, setView] = useState('FRONT');
  const [selectedSize, setSelectedSize] = useState('S');

  const colors = [
    { name: 'white', value: '#FFFFFF' },
    { name: 'black', value: '#000000' },
    { name: 'grey', value: '#808080' },
    { name: 'purple', value: '#9C27B0' },
    { name: 'dark brown', value: '#3B2A1A' },
  ];

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        height: 'fit-content',
        position: 'relative',
        borderLeft: '4px solid #1976D2',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontFamily: "'Playfair Display'",
          fontSize: { xs: 20, md: 24 },
          fontWeight: 700,
          color: '#3B2A1A',
          mb: 0.5,
        }}
      >
        Product Details
      </Typography>
      <Typography
        sx={{
          fontSize: 14,
          color: '#666',
          mb: 2,
        }}
      >
        Configure your base product
      </Typography>
      <Box
        sx={{
          height: '1px',
          backgroundColor: '#E0E0E0',
          mb: 3,
        }}
      />

      {/* CATEGORY */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            textTransform: 'uppercase',
            mb: 1,
            letterSpacing: '0.5px',
          }}
        >
          CATEGORY
        </Typography>
        <FormControl fullWidth>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            IconComponent={ArrowDropDownIcon}
            sx={{
              borderRadius: '8px',
              backgroundColor: '#F5DEB3',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              height: '40px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '& .MuiSelect-select': {
                color: '#3B2A1A',
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          >
            <MenuItem value="Apparel">Apparel</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Home & Living">Home & Living</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* PRODUCT */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            textTransform: 'uppercase',
            mb: 1,
            letterSpacing: '0.5px',
          }}
        >
          PRODUCT
        </Typography>
        <FormControl fullWidth>
          <Select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            IconComponent={ArrowDropDownIcon}
            sx={{
              borderRadius: '8px',
              backgroundColor: '#F5DEB3',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              height: '40px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
              '& .MuiSelect-select': {
                color: '#3B2A1A',
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          >
            <MenuItem value="Classic Cotton T-Shirt">Classic Cotton T-Shirt</MenuItem>
            <MenuItem value="Premium T-Shirt">Premium T-Shirt</MenuItem>
            <MenuItem value="V-Neck T-Shirt">V-Neck T-Shirt</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* BASE COLOR */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            textTransform: 'uppercase',
            mb: 1.5,
            letterSpacing: '0.5px',
          }}
        >
          BASE COLOR
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {colors.map((color) => (
            <Box
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: color.value,
                border: selectedColor === color.name ? '2px solid #000000' : '2px solid #E0E0E0',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* VIEW */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            textTransform: 'uppercase',
            mb: 1.5,
            letterSpacing: '0.5px',
          }}
        >
          VIEW
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            backgroundColor: '#E8E8E8',
            borderRadius: '8px',
            p: 0.25,
            gap: 0,
          }}
        >
          <Button
            onClick={() => setView('FRONT')}
            sx={{
              borderRadius: '6px',
              px: 3,
              py: 0.75,
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: view === 'FRONT' ? '#F5DEB3' : 'transparent',
              color: view === 'FRONT' ? '#3B2A1A' : '#999999',
              border: 'none',
              boxShadow: 'none',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: view === 'FRONT' ? '#F5DEB3' : 'transparent',
                boxShadow: 'none',
              },
            }}
          >
            FRONT
          </Button>
          <Button
            onClick={() => setView('BACK')}
            sx={{
              borderRadius: '6px',
              px: 3,
              py: 0.75,
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              backgroundColor: view === 'BACK' ? '#F5DEB3' : 'transparent',
              color: view === 'BACK' ? '#3B2A1A' : '#999999',
              border: 'none',
              boxShadow: 'none',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: view === 'BACK' ? '#F5DEB3' : 'transparent',
                boxShadow: 'none',
              },
            }}
          >
            BACK
          </Button>
        </Box>
      </Box>

      {/* SIZE */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            textTransform: 'uppercase',
            mb: 1.5,
            letterSpacing: '0.5px',
          }}
        >
          SIZE
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {sizes.map((size) => (
            <Button
              key={size}
              onClick={() => setSelectedSize(size)}
              sx={{
                borderRadius: '8px',
                minWidth: 48,
                px: 2,
                py: 1,
                fontSize: 14,
                fontWeight: selectedSize === size ? 700 : 400,
                textTransform: 'none',
                backgroundColor: selectedSize === size ? '#D2B48C' : '#F5DEB3',
                color: '#3B2A1A',
                border: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: selectedSize === size ? '#D2B48C' : '#F5DEB3',
                  boxShadow: 'none',
                },
              }}
            >
              {size}
            </Button>
          ))}
        </Box>
      </Box>

      {/* UPLOAD DESIGN */}
      <Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: '#3B2A1A',
            textTransform: 'uppercase',
            mb: 1.5,
            letterSpacing: '0.5px',
          }}
        >
          UPLOAD DESIGN
        </Typography>
        <Box
          component="input"
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          sx={{ display: 'none' }}
          id="design-upload"
        />
        <Box
          component="label"
          htmlFor="design-upload"
          sx={{
            border: '2px dashed #D0D0D0',
            borderRadius: '12px',
            p: 4,
            textAlign: 'center',
            backgroundColor: '#F5DEB3',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '150px',
            width: '100%',
            '&:hover': {
              borderColor: '#3B2A1A',
              backgroundColor: '#F5DEB3',
            },
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3B2A1A',
              color: '#FFFFFF',
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              mb: 1,
              '&:hover': {
                backgroundColor: '#2A1F15',
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Upload Design
          </Button>
          <Typography
            sx={{
              fontSize: 14,
              color: '#999999',
              mt: 0.5,
            }}
          >
            or drag files here
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
