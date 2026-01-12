import Head from 'next/head';
import { Box, Container, Grid, Alert } from '@mui/material';
import DesignHeader from '@/components/design/DesignHeader';
import ProductDetailsPanel from '@/components/design/ProductDetailsPanel';
import ProductPreviewPanel from '@/components/design/ProductPreviewPanel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ProductCreation() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Tshirt');

  // Check if this is a fresh start (from dashboard) or coming back (from review-pricing)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const isFreshStart = router.query.fresh === 'true';
    
    if (isFreshStart) {
      // Fresh start: Clear old data and initialize with defaults
      const defaultData = {
        category: 'Tshirt',
        product: '',
        selectedColor: 'black',
        view: 'FRONT',
        selectedSize: [],
        designFile: null,
        isFreshStart: true, // Flag to indicate this is a fresh start
      };
      localStorage.setItem('productCreationData', JSON.stringify(defaultData));
      setCurrentCategory('Tshirt');
      // Remove the query parameter from URL without reloading
      router.replace('/product-creation', undefined, { shallow: true });
    } else {
      // Coming back from review-pricing: Preserve existing data
      const productData = localStorage.getItem('productCreationData');
      if (productData) {
        const parsed = JSON.parse(productData);
        if (parsed.category) {
          setCurrentCategory(parsed.category);
        }
      } else {
        // No data exists, initialize defaults
        const defaultData = {
          category: 'Tshirt',
          product: '',
          selectedColor: 'black',
          view: 'FRONT',
          selectedSize: [],
          designFile: null,
        };
        localStorage.setItem('productCreationData', JSON.stringify(defaultData));
        setCurrentCategory('Tshirt');
      }
    }
  }, [router.query.fresh]); // Run when query param changes

  useEffect(() => {
    const updateCategory = () => {
      const productData = localStorage.getItem('productCreationData');
      if (productData) {
        const parsed = JSON.parse(productData);
        if (parsed.category) {
          setCurrentCategory(parsed.category);
        }
      }
    };
    updateCategory();  
    window.addEventListener('storage', updateCategory);
    const interval = setInterval(updateCategory, 500);
    return () => {
      window.removeEventListener('storage', updateCategory);
      clearInterval(interval);
    };
  }, []);

  // Map frontend category to backend category
  const mapCategory = (category) => {
    const categoryMap = {
      'Apparel': 'Tshirt',
      'Accessories': 'Hat',
      'Home & Living': 'Mug',
    };
    return categoryMap[category] || 'Tshirt';
  };

  // Map frontend color to backend color
  const mapColor = (color) => {
    const colorMap = {
      'white': 'White',
      'black': 'Black',
      'grey': 'Blue',
      'purple': 'Red',
      'dark brown': 'Black',
    };
    return colorMap[color] || 'White';
  };

  // Map frontend size to backend size
  const mapSize = (size) => {
    const sizeMap = {
      'S': 'S',
      'M': 'M',
      'L': 'L',
      'XL': 'XL',
      '2XL': 'XXL',
      'XXL': 'XXL'
    };
    return sizeMap[size] || size;
  };

  const mapSizes = (sizes) => {
    if (Array.isArray(sizes)) {
      return sizes.map(size => mapSize(size));
    }
    // Fallback for single size (backward compatibility)
    return [mapSize(sizes)];
  };
  
  const handleCreateProduct = async (productData, productTitle, description, price) => {
    setLoading(true);
    setError('');
    setSuccess('');
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Session expired. Please login again.');
        router.push('/login-page');
        return;
      }
  
      // Prepare product data for backend
      const productPayload = {
        name: productTitle,
        description: description || '',
        category: mapCategory(productData.category),
        price: price,
        design: productData.designFile || '',
        colors: [mapColor(productData.selectedColor)],
        sizes: mapSizes(productData.selectedSize),
      };
  
      const response = await axios.post('/api/v1/artist/products/create', productPayload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        setSuccess('Product created successfully!');
        localStorage.removeItem('productCreationData');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setError('Session expired. Please login again.');
        router.push('/login-page');
      } else {
        setError(err.response?.data?.message || 'Failed to create product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Design - Artloom</title>
        <meta name="description" content="Create and design your custom products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F5ECE3',
        }}
      >
        <DesignHeader />
        {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          <Grid container spacing={3}>
            {/* Left Panel - Product Details */}
            <Grid item xs={12} md={5}>
              <ProductDetailsPanel onCreateProduct={handleCreateProduct}/>
            </Grid>

            {/* Right Panel - Product Preview */}
            <Grid item xs={12} md={9} sx={{ml:"auto", transform: "translateX(-24px)"}}>
              <ProductPreviewPanel category={currentCategory} />
            </Grid>
          </Grid>

        </Container>
      </Box>
    </>
  );
}

