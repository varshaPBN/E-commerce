import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, Select, MenuItem, FormControl, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import PaletteIcon from '@mui/icons-material/Palette';

export default function ProductPreviewPanel(props = {}) {
  const router = useRouter();
  const [font, setFont] = useState('Playfair Display');
  const [fontSize, setFontSize] = useState('32');
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(true);
    // Get product preview image based on category
  const getCategoryImage = (category) => {
    const categoryImages = {
      'Tshirt': 'https://images.unsplash.com/photo-1651761179569-4ba2aa054997?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Hats': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Mug': 'https://images.unsplash.com/photo-1650959858546-d09833d5317b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Bags': 'https://images.unsplash.com/photo-1732963947955-858ad7d5e540?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    return categoryImages[category] || categoryImages['Tshirt'];
  };

  // Get uploaded design from localStorage
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('Tshirt');
  const [previewImage, setPreviewImage] = useState(getCategoryImage('Tshirt'));

    useEffect(() => {
    const updateData = () => {
      const productData = localStorage.getItem('productCreationData');
      if (productData) {
        const parsed = JSON.parse(productData);
        // Update category
        const category = props.category || parsed.category || 'Tshirt';
        setCurrentCategory(category);
        setPreviewImage(getCategoryImage(category));
        // Update design
        if (parsed.designFile) {
          setUploadedDesign(parsed.designFile);
        } else {
          setUploadedDesign(null);
        }
      } else {
        // If no localStorage data, use props or defaults
        const category = props.category || 'Tshirt';
        setCurrentCategory(category);
        setPreviewImage(getCategoryImage(category));
      }
    };
    
    updateData();
    // Check for changes every 500ms
    const interval = setInterval(updateData, 500);
    
    return () => clearInterval(interval);
  }, [props.category]);

  // Also update when window regains focus (user navigates back)
  useEffect(() => {
    const handleFocus = () => {
      const productData = localStorage.getItem('productCreationData');
      if (productData) {
        const parsed = JSON.parse(productData);
        const category = props.category || parsed.category || 'Tshirt';
        setCurrentCategory(category);
        setPreviewImage(getCategoryImage(category));
        if (parsed.designFile) {
          setUploadedDesign(parsed.designFile);
        } else {
          setUploadedDesign(null);
        }
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [props.category]);

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
          height: '500px',
          width: '700px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
              <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Product Base Image */}
          <Box
            component="img"
            src={previewImage}
            alt="Product Preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              borderRadius: '8px',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          {/* Uploaded Design Overlay */}
          {uploadedDesign && (
            <Box
              component="img"
              src={uploadedDesign}
              alt="Design Overlay"
              sx={{
                maxWidth: '50%',
                maxHeight: '50%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                pointerEvents: 'none',
                mixBlendMode: 'multiply',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
          )}
        </Box>
      </Box>

      {/* Submit Design Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={() => {
            // Ensure data is saved before navigating
            const productData = localStorage.getItem('productCreationData');
            if (productData) {
              router.push('/review-pricing');
            } else {
              alert('Please fill in product details before proceeding');
            }
          }}
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

