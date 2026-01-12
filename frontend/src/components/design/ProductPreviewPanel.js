import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button, Slider } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

export default function ProductPreviewPanel(props = {}) {
  const router = useRouter();
  // Get product preview image based on category and color
  const getCategoryImage = (category, color = 'black') => {
    const categoryImages = {
      'Tshirt': {
        'white': '/tshirt/white.png',
        'black': '/tshirt/black.png',
        'red'  : '/tshirt/red.png',
        'blue' : '/tshirt/blue.png'
      },
      'Hat': {
        'white': '/hat/white.png',
        'black': '/hat/black.png',
        'red'  : '/hat/red.png',
        'blue' : '/hat/blue.png'
      },
      'Mug': {
        'white': '/mug/white.png',
        'black': '/mug/black.png',
        'red'  : '/mug/red.png',
        'blue' : '/mug/blue.png',
      },
      'Bag': {
        'white': '/bag/white.png',
        'black': '/bag/black.png',
        'red'  : '/bag/red.png',
        'blue' : '/bag/blue.png',
      },
    };
    
    // If category exists and has color options
    if (categoryImages[category] && categoryImages[category][color]) {
      return categoryImages[category][color];
    }
    // Fallback to black if color doesn't exist
    if (categoryImages[category] && categoryImages[category]['black']) {
      return categoryImages[category]['black'];
    }
    // Fallback to white if black doesn't exist
    if (categoryImages[category] && categoryImages[category]['white']) {
      return categoryImages[category]['white'];
    }
    // Fallback to Tshirt black if category doesn't exist
    return categoryImages['Tshirt']?.['black'] || '/tshirt/black.png';
  };

  // Use consistent initial state for SSR hydration
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('Tshirt');
  const [currentColor, setCurrentColor] = useState('black');
  const [previewImage, setPreviewImage] = useState(getCategoryImage('Tshirt', 'black'));
  const [designSize, setDesignSize] = useState(50); // Default 50% size
  const [designPosition, setDesignPosition] = useState({ top: 50, left: 50 }); // Default center position (50%, 50%)
  const lastValidDesignRef = useRef(null); // Store last valid design to prevent clearing

    useEffect(() => {
    // Only run on client-side after hydration
    if (typeof window === 'undefined') return;
    
    const updateData = () => {
      const productData = localStorage.getItem('productCreationData');
      if (productData) {
        const parsed = JSON.parse(productData);
        // Update category - prioritize localStorage over props since it's updated immediately
        const category = parsed.category || props.category || 'Tshirt';
        // Update color
        const color = parsed.selectedColor || 'black';
        setCurrentCategory(category);
        setCurrentColor(color);
        setPreviewImage(getCategoryImage(category, color));
        // Check if this is a fresh start
        const isFreshStart = parsed.designFile === null && parsed.isFreshStart === true;
        
        // Update design - only show if designFile exists and is not null, AND it's NOT a fresh start
        // Preserve last valid design if current is null (prevents clearing during race conditions)
        if (!isFreshStart && parsed.designFile && parsed.designFile !== null && parsed.designFile !== '') {
          setUploadedDesign(parsed.designFile);
          lastValidDesignRef.current = parsed.designFile; // Store valid design
        } else if (isFreshStart) {
          // Fresh start - explicitly clear design
          setUploadedDesign(null);
          lastValidDesignRef.current = null;
        } else {
          // Only clear if we don't have a last valid design (user explicitly removed it)
          // Otherwise preserve the last valid design to prevent it from disappearing
          if (lastValidDesignRef.current) {
            setUploadedDesign(lastValidDesignRef.current);
          } else {
            setUploadedDesign(null);
          }
        }
        // Update design size if saved
        if (parsed.designSize !== undefined) {
          setDesignSize(parsed.designSize);
        }
        // Update design position if saved
        if (parsed.designPosition) {
          setDesignPosition(parsed.designPosition);
        }
      } else {
        // If no localStorage data, use props or defaults
        const category = props.category || 'Tshirt';
        const color = 'black';
        setCurrentCategory(category);
        setCurrentColor(color);
        setPreviewImage(getCategoryImage(category, color));
      }
    };
    
    // Load immediately on mount
    updateData();
    // Check for changes every 500ms to stay in sync
    const interval = setInterval(updateData, 500);
    
    return () => clearInterval(interval);
  }, [props.category]);
  
  // Also load immediately when component mounts (ensures design shows right away when navigating back)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const productData = localStorage.getItem('productCreationData');
    if (productData) {
      try {
        const parsed = JSON.parse(productData);
        // Check if this is a fresh start (designFile is explicitly null)
        const isFreshStart = parsed.designFile === null && parsed.isFreshStart === true;
        
        // Load design immediately ONLY if it's NOT a fresh start
        // This is critical for showing design when navigating back from review-pricing
        if (!isFreshStart && parsed.designFile && parsed.designFile !== null && parsed.designFile !== '') {
          setUploadedDesign(parsed.designFile);
          lastValidDesignRef.current = parsed.designFile; // Store valid design
        } else {
          // Fresh start - explicitly clear design
          setUploadedDesign(null);
          lastValidDesignRef.current = null;
        }
        // Load category and color - prioritize localStorage over props
        const category = parsed.category || props.category || 'Tshirt';
        const color = parsed.selectedColor || 'black';
        setCurrentCategory(category);
        setCurrentColor(color);
        setPreviewImage(getCategoryImage(category, color));
        // Load design size and position
        if (parsed.designSize !== undefined) {
          setDesignSize(parsed.designSize);
        }
        if (parsed.designPosition) {
          setDesignPosition(parsed.designPosition);
        }
      } catch (error) {
        console.error('Error parsing productCreationData:', error);
      }
    }
  }, []); // Run once on mount

  // Also update when window regains focus (user navigates back)
  useEffect(() => {
      const handleFocus = () => {
      const productData = localStorage.getItem('productCreationData');
      if (productData) {
        const parsed = JSON.parse(productData);
        const category = parsed.category || props.category || 'Tshirt';
        const color = parsed.selectedColor || 'black';
        setCurrentCategory(category);
        setCurrentColor(color);
        setPreviewImage(getCategoryImage(category, color));
        // Update design - only show if designFile exists and is not null
        if (parsed.designFile && parsed.designFile !== null && parsed.designFile !== '') {
          setUploadedDesign(parsed.designFile);
        } else {
          setUploadedDesign(null);
        }
        // Update design size if saved
        if (parsed.designSize !== undefined) {
          setDesignSize(parsed.designSize);
        }
        // Update design position if saved
        if (parsed.designPosition) {
          setDesignPosition(parsed.designPosition);
        }
      }
    };
    
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [props.category]);

  // Handle design size change
  const handleDesignSizeChange = (event, newValue) => {
    setDesignSize(newValue);
    // Save to localStorage
    const productData = localStorage.getItem('productCreationData');
    if (productData) {
      const parsed = JSON.parse(productData);
      parsed.designSize = newValue;
      localStorage.setItem('productCreationData', JSON.stringify(parsed));
    }
  };

  // Handle drag to position design
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setDragStart({
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !uploadedDesign) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to percentage
    const newLeft = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newTop = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    const newPosition = { top: newTop, left: newLeft };
    setDesignPosition(newPosition);
    
    // Save to localStorage
    const productData = localStorage.getItem('productCreationData');
    if (productData) {
      const parsed = JSON.parse(productData);
      parsed.designPosition = newPosition;
      localStorage.setItem('productCreationData', JSON.stringify(parsed));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset position handler
  const handleResetPosition = () => {
    const newPosition = { top: 50, left: 50 };
    setDesignPosition(newPosition);
    const productData = localStorage.getItem('productCreationData');
    if (productData) {
      const parsed = JSON.parse(productData);
      parsed.designPosition = newPosition;
      localStorage.setItem('productCreationData', JSON.stringify(parsed));
    }
  };

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
            cursor: uploadedDesign ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
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
              onMouseDown={handleMouseDown}
              sx={{
                maxWidth: `${designSize}%`,
                maxHeight: `${designSize}%`,
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                position: 'absolute',
                top: `${designPosition.top}%`,
                left: `${designPosition.left}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                pointerEvents: 'auto',
                cursor: isDragging ? 'grabbing' : 'grab',
                mixBlendMode: 'multiply',
                transition: isDragging ? 'none' : 'top 0.1s ease, left 0.1s ease, max-width 0.2s ease, max-height 0.2s ease',
                outline: 'none !important',
                border: 'none !important',
                boxShadow: 'none !important',
                filter: 'none',
                WebkitFilter: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                '&::before': {
                  display: 'none',
                },
                '&::after': {
                  display: 'none',
                },
                '&:hover': {
                  opacity: 0.9,
                },
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

      {/* Design Size Control */}
      {uploadedDesign && (
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            p: 3,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ZoomInIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
            <Typography
              sx={{
                fontFamily: "'Playfair Display'",
                fontSize: { xs: 18, md: 20 },
                fontWeight: 700,
                color: '#3B2A1A',
              }}
            >
              Design Size
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ZoomOutIcon sx={{ color: '#666', fontSize: 20 }} />
            <Slider
              value={designSize}
              onChange={handleDesignSizeChange}
              min={20}
              max={80}
              step={5}
              sx={{
                flex: 1,
                color: '#3B2A1A',
                '& .MuiSlider-thumb': {
                  backgroundColor: '#3B2A1A',
                  '&:hover': {
                    boxShadow: '0px 0px 0px 8px rgba(59, 42, 26, 0.16)',
                  },
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#3B2A1A',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#E0E0E0',
                },
              }}
            />
            <ZoomInIcon sx={{ color: '#666', fontSize: 20 }} />
            <Typography sx={{ minWidth: 50, textAlign: 'right', fontSize: 14, fontWeight: 600, color: '#3B2A1A' }}>
              {designSize}%
            </Typography>
          </Box>
        </Box>
      )}


    </Box>
  );
}

