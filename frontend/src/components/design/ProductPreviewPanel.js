import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import PaletteIcon from '@mui/icons-material/Palette';

export default function ProductPreviewPanel() {
  const router = useRouter();
  const [font, setFont] = useState('Playfair Display');
  const [fontSize, setFontSize] = useState('32');
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(true);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Product Preview */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 4,
          textAlign: 'center',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Box
          component="img"
          src="https://via.placeholder.com/400x500/FDF8F2/3B2A1A?text=T-Shirt+Preview"
          alt="Product Preview"
          sx={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
          }}
        />
      </Box>

      {/* Submit Design Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => router.push('/review-pricing')}
          sx={{
            backgroundColor: '#3B2A1A',
            color: '#FFFFFF',
            textTransform: 'none',
            borderRadius: '12px',
            py: 1,
            px: 4,
            fontSize: 14,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#2A1F15',
            },
          }}
        >
          Submit Design
        </Button>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: '1px',
          backgroundColor: '#E0E0E0',
          my: 2,
        }}
      />

      {/* Text Options */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 3,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 18, md: 20 },
            fontWeight: 700,
            color: '#3B2A1A',
            mb: 2,
          }}
        >
          Text Options
        </Typography>

        {/* Font and Size Dropdowns */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ flex: 1 }}>
            <Select
              value={font}
              onChange={(e) => setFont(e.target.value)}
              IconComponent={ArrowDropDownIcon}
              sx={{
                borderRadius: '8px',
                backgroundColor: '#F8F8F8',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3B2A1A',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3B2A1A',
                },
              }}
            >
              <MenuItem value="Playfair Display">Playfair Display</MenuItem>
              <MenuItem value="Inter">Inter</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <Select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              IconComponent={ArrowDropDownIcon}
              sx={{
                borderRadius: '8px',
                backgroundColor: '#F8F8F8',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3B2A1A',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3B2A1A',
                },
              }}
            >
              <MenuItem value="12">12</MenuItem>
              <MenuItem value="16">16</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="24">24</MenuItem>
              <MenuItem value="32">32</MenuItem>
              <MenuItem value="48">48</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Formatting Icons */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton
            onClick={() => setBold(!bold)}
            sx={{
              backgroundColor: bold ? '#3B2A1A' : 'transparent',
              color: bold ? '#FFFFFF' : '#3B2A1A',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: bold ? '#2A1F15' : '#F5F5F5',
              },
            }}
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            onClick={() => setItalic(!italic)}
            sx={{
              backgroundColor: italic ? '#3B2A1A' : 'transparent',
              color: italic ? '#FFFFFF' : '#3B2A1A',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: italic ? '#2A1F15' : '#F5F5F5',
              },
            }}
          >
            <FormatItalicIcon />
          </IconButton>
          <IconButton
            onClick={() => setUnderline(!underline)}
            sx={{
              backgroundColor: underline ? '#3B2A1A' : 'transparent',
              color: underline ? '#FFFFFF' : '#3B2A1A',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: underline ? '#2A1F15' : '#F5F5F5',
              },
            }}
          >
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: 'transparent',
              color: '#3B2A1A',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: 'transparent',
              color: '#3B2A1A',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#F5F5F5',
              },
            }}
          >
            <PaletteIcon />
          </IconButton>
          <Typography sx={{ fontSize: 12, color: '#666', ml: 1 }}>
            Color
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

