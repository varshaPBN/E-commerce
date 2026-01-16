import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, Button, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';

export default function ProductDetailsPanel() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [colors, setColors] = useState([]);
  const [loadingColors, setLoadingColors] = useState(true);
  const [sizes, setSizes] = useState([]);
  const [loadingSizes, setLoadingSizes] = useState(true);
  // Use consistent initial state for SSR hydration
  const [product, setProduct] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [view, setView] = useState('FRONT');
  const [selectedSize, setSelectedSize] = useState([]);
  const [designFile, setDesignFile] = useState(null);
  const [designPreview, setDesignPreview] = useState(null);
  const [category, setCategory] = useState('Tshirt');
  const fileInputRef = useRef(null);
  const categoryRestoredRef = useRef(false); // Track if category has been restored from localStorage
  const colorRestoredRef = useRef(false); // Track if color has been restored from localStorage
  
    // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/v1/artist/products/categories');
        if (response.data.categories && response.data.categories.length > 0) {
          setCategories(response.data.categories);
          // Only set default category if we haven't restored one from localStorage
          if (!categoryRestoredRef.current) {
            setCategory(response.data.categories[0]); // Set first category as default
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback to backend categories if API fails
        setCategories(['Tshirt', 'Hat', 'Mug', 'Bag']);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

    // Map backend color names to hex values
    const getColorHex = (colorName) => {
      const colorMap = {
        'White': '#FFFFFF',
        'Black': '#000000',
        'Red': '#FF0000',
        'Blue': '#0000FF',
      };
      return colorMap[colorName] || '#FFFFFF';
    };
  
    // Map backend color names to lowercase for state
    const getColorKey = (colorName) => {
      return colorName.toLowerCase();
    };
    // Fetch colors from backend
    useEffect(() => {
      const fetchColors = async () => {
        try {
          // Check localStorage first to see if color was already restored
          const savedData = typeof window !== 'undefined' ? localStorage.getItem('productCreationData') : null;
          const hasSavedColor = savedData ? (() => {
            try {
              const parsed = JSON.parse(savedData);
              return parsed.selectedColor && parsed.selectedColor !== null && parsed.selectedColor !== '';
            } catch {
              return false;
            }
          })() : false;
          
          const response = await axios.get('/api/v1/artist/products/colors');
          if (response.data.colors && response.data.colors.length > 0) {
            // Transform backend colors to frontend format
            const transformedColors = response.data.colors.map(colorName => ({
              name: getColorKey(colorName),
              value: getColorHex(colorName),
              backendName: colorName
            }));
            setColors(transformedColors);
            // Only set default color if we haven't restored one from localStorage
            if (!colorRestoredRef.current && !hasSavedColor) {
              // Default to black if available, otherwise first color
              const blackColor = transformedColors.find(c => c.name === 'black');
              if (blackColor) {
                setSelectedColor('black');
              } else if (transformedColors.length > 0) {
                setSelectedColor(transformedColors[0].name);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching colors:', error);
          // Check localStorage before setting fallback
          const savedData = typeof window !== 'undefined' ? localStorage.getItem('productCreationData') : null;
          const hasSavedColor = savedData ? (() => {
            try {
              const parsed = JSON.parse(savedData);
              return parsed.selectedColor && parsed.selectedColor !== null && parsed.selectedColor !== '';
            } catch {
              return false;
            }
          })() : false;
          
          // Fallback to default colors if API fails
          setColors([
            { name: 'white', value: '#FFFFFF', backendName: 'White' },
            { name: 'black', value: '#000000', backendName: 'Black' },
            { name: 'red', value: '#FF0000', backendName: 'Red' },
            { name: 'blue', value: '#0000FF', backendName: 'Blue' },
          ]);
          // Only set default color if we haven't restored one from localStorage
          if (!colorRestoredRef.current && !hasSavedColor) {
            setSelectedColor('black'); // Default to black
          }
        } finally {
          setLoadingColors(false);
        }
      };
      fetchColors();
    }, []);

      // Fetch sizes from backend
  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get('/api/v1/artist/products/sizes');
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSizes(response.data.sizes);
          if (response.data.sizes.length > 0) {
            setSelectedSize([response.data.sizes[0]]);
          }
        }
      } catch (error) {
        console.error('Error fetching sizes:', error);
        // Fallback to default sizes if API fails
        setSizes(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
      } finally {
        setLoadingSizes(false);
      }
    };
    fetchSizes();
  }, []);

  // Track if component has mounted to prevent save on initial mount
  const [hasMounted, setHasMounted] = useState(false);
  const isRestoringRef = useRef(true); // Track if we're currently restoring
  const restoredDesignRef = useRef(null); // Store the restored design value
  const designRestoredRef = useRef(false); // Track if design has been successfully restored

  // Load from localStorage after hydration (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    isRestoringRef.current = true; // Mark that we're restoring
    
    const savedData = localStorage.getItem('productCreationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Check if this is a fresh start (designFile is explicitly null)
      const isFreshStart = parsed.designFile === null && parsed.isFreshStart === true;
      
      // Restore all values from localStorage
      if (parsed.category) {
        setCategory(parsed.category);
        categoryRestoredRef.current = true; // Mark category as restored
      }
      if (parsed.product !== undefined) {
        setProduct(parsed.product);
      }
      if (parsed.selectedColor) {
        setSelectedColor(parsed.selectedColor);
        colorRestoredRef.current = true; // Mark color as restored
      }
      if (parsed.view) {
        setView(parsed.view);
      }
      if (parsed.selectedSize && Array.isArray(parsed.selectedSize)) {
        setSelectedSize(parsed.selectedSize);
      }
      // Restore designPreview ONLY if it exists AND it's NOT a fresh start
      if (!isFreshStart && parsed.designFile && parsed.designFile !== null && parsed.designFile !== '') {
        restoredDesignRef.current = parsed.designFile; // Store in ref
        designRestoredRef.current = true; // Mark as restored
        setDesignPreview(parsed.designFile);
      } else {
        // Fresh start - explicitly clear design
        setDesignPreview(null);
        restoredDesignRef.current = null;
        designRestoredRef.current = false;
      }
    } else {
      // No saved data - this is a fresh start, allow defaults
      categoryRestoredRef.current = false;
      colorRestoredRef.current = false;
      setDesignPreview(null);
      restoredDesignRef.current = null;
      designRestoredRef.current = false;
    }
    
    // Mark restoration as complete after state updates
    // Use a delay to ensure React has processed all state updates
    setTimeout(() => {
      isRestoringRef.current = false;
      setHasMounted(true);
    }, 300); // Give time for all state updates to complete
  }, []); // Empty deps - only run once on mount

    
  // Save to localStorage whenever data changes (but not on initial mount or during restore)
  useEffect(() => {
    if (!hasMounted) return; // Don't save until after initial mount/restore
    if (isRestoringRef.current) return; // Don't save while restoring
    
    // Always check localStorage first to preserve existing design
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('productCreationData');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // If localStorage has a design but current designPreview is null/empty, preserve it
        if ((!designPreview || designPreview === null || designPreview === '') && 
            parsed.designFile && parsed.designFile !== null && parsed.designFile !== '') {
          // Only restore if we haven't already restored it (prevents loops)
          if (!designRestoredRef.current || designPreview !== parsed.designFile) {
            // Use requestAnimationFrame to ensure state update happens after current render
            requestAnimationFrame(() => {
              setDesignPreview(parsed.designFile);
              restoredDesignRef.current = parsed.designFile;
              designRestoredRef.current = true;
            });
          }
          // Save with the preserved design (don't overwrite with null)
          const productData = {
            category: parsed.category || category, // Preserve saved category
            product,
            selectedColor: parsed.selectedColor || selectedColor, // Preserve saved color
            view,
            selectedSize,
            designFile: parsed.designFile, // Preserve saved design
            designSize: parsed.designSize,
            designPosition: parsed.designPosition,
            isFreshStart: false, // Clear fresh start flag when preserving design
          };
    localStorage.setItem('productCreationData', JSON.stringify(productData));
    return; // Don't proceed with saving null
        }
      }
    }
    
    // Normal save - use designPreview if it exists, otherwise use restored design from ref
    const designToSave = designPreview || restoredDesignRef.current;
    
    // Only save if we have a design or if user explicitly cleared it (and it was previously null)
    // Don't save null if we have a restored design
    if (!designToSave && designRestoredRef.current && restoredDesignRef.current) {
      // User hasn't cleared it, preserve the restored design
      return;
    }
    
    // Only preserve category/color from localStorage during restoration, not after user interaction
    const savedData = typeof window !== 'undefined' ? localStorage.getItem('productCreationData') : null;
    let categoryToSave = category;
    let colorToSave = selectedColor;
    
    // Only preserve from localStorage if we're currently restoring (prevents API fetch from overwriting during restore)
    // After restoration is complete, allow user to change category freely
    if (savedData && isRestoringRef.current) {
      try {
        const parsed = JSON.parse(savedData);
        // Only use saved category if we're still restoring (prevents API fetch from overwriting)
        if (parsed.category && isRestoringRef.current) {
          categoryToSave = parsed.category;
          // Also update state if it's different (in case API fetch overwrote it)
          if (category !== parsed.category) {
            setCategory(parsed.category);
          }
        }
        // Preserve color too, but only during restoration
        if (parsed.selectedColor && isRestoringRef.current) {
          colorToSave = parsed.selectedColor;
          if (selectedColor !== parsed.selectedColor) {
            setSelectedColor(parsed.selectedColor);
          }
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
    
    const productData = {
      category: categoryToSave,
      product,
      selectedColor: colorToSave,
      view,
      selectedSize,
      designFile: designToSave, // Use designPreview or restored design
      designSize: undefined, // Will be saved by ProductPreviewPanel
      designPosition: undefined, // Will be saved by ProductPreviewPanel
      isFreshStart: false, // Clear fresh start flag when user uploads design
    };
    localStorage.setItem('productCreationData', JSON.stringify(productData));
    
    // Update restoredDesignRef if we're saving a design
    if (designToSave) {
      restoredDesignRef.current = designToSave;
      designRestoredRef.current = true;
    }
  }, [category, product, selectedColor, view, selectedSize, designPreview, hasMounted]);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setDesignFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setDesignPreview(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle size selection (toggle)
  const handleSizeToggle = (size) => {
    setSelectedSize(prev => {
      if (prev.includes(size)) {
        // Remove size if already selected
        return prev.filter(s => s !== size);
      } else {
        // Add size if not selected
        return [...prev, size];
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        minHeight: 'fit-content',
        position: 'relative',
        borderLeft: '4px solid #1976D2',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
        overflow: 'visible'
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
              {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
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
        <TextField
          fullWidth
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#F5DEB3',
              boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
              height: '40px',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
              '& input': {
                color: '#3B2A1A',
                fontSize: 14,
                fontWeight: 500,
                padding: '10px 14px',
              },
            },
          }}
        />
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
                    {sizes && sizes.length > 0 ? sizes.map((size) => {
            const isSelected = selectedSize.includes(size);
            return (
              <Button
                key={size}
                onClick={() => handleSizeToggle(size)}
                sx={{
                  borderRadius: '8px',
                  minWidth: 48,
                  px: 2,
                  py: 1,
                  fontSize: 14,
                  fontWeight: isSelected ? 700 : 400,
                  textTransform: 'none',
                  backgroundColor: isSelected ? '#D2B48C' : '#F5DEB3',
                  color: '#3B2A1A',
                  border: isSelected ? '2px solid #3B2A1A' : 'none',
                  boxShadow: isSelected ? '0px 2px 4px rgba(0,0,0,0.2)' : 'none',
                  '&:hover': {
                    backgroundColor: isSelected ? '#D2B48C' : '#F5DEB3',
                    boxShadow: 'none',
                  },
                }}
              >
                {size}
              </Button>
            );
          }) : (
            <Typography sx={{ fontSize: 12, color: '#999' }}>Loading sizes...</Typography>
          )}
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
          ref={fileInputRef}
          onChange={handleFileChange}
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
            borderWidth: '2px',
            borderStyle: 'dashed',
            '&:hover': {
              borderColor: '#3B2A1A',
              backgroundColor: '#F5DEB3',
              borderWidth: '3px',
            },
          }}
        >
          {designPreview ? (
            <Box
              component="img"
              src={designPreview}
              alt="Design preview"
              sx={{
                maxWidth: '100%',
                maxHeight: '120px',
                borderRadius: '8px',
                mb: 1,
              }}
            />
          ) : (
            <>
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
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
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
