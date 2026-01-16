import Head from 'next/head';
import { Box, Container, Grid, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import ReviewPricingHeader from '@/components/review-pricing/ReviewPricingHeader';
import ProductDetailsCard from '@/components/review-pricing/ProductDetailsCard';
import PricingProfitCard from '@/components/review-pricing/PricingProfitCard';
import LivePreviewCard from '@/components/review-pricing/LivePreviewCard';

export default function ReviewPricing() {
  const router = useRouter();
  const [productTitle, setProductTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sellingPrice, setSellingPrice] = useState(35.0);
  const [profitMargin, setProfitMargin] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [productData, setProductData] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('productCreationData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setProductData(parsed);
      // Load product title from localStorage
      if (parsed.product) {
      setProductTitle(parsed.product);
    }
    } else {
      router.push('/product-creation');
    }
  }, [router]);

  const mapCategory = (category) => {
    // If category is already backend format, return as-is
    if (['Tshirt', 'Hat', 'Mug', 'Bag'].includes(category)) {
      return category;
    }
    // Otherwise map from frontend format
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
      'grey': 'Blue', // Map grey to Blue as backend doesn't have grey
      'purple': 'Red', // Map purple to Red as backend doesn't have purple
      'dark brown': 'Black', // Map dark brown to Black
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
    };
    return sizeMap[size] || 'M';
  };
  const mapSizes = (sizes) => {
    if (Array.isArray(sizes)) {
      return sizes.map(size => mapSize(size));
    }
    // Fallback for single size (backward compatibility)
    return [mapSize(sizes)];
  };

  const handlePublish = async () => {
    if (!productTitle.trim()) {
      setError('Please enter a product title');
      return;
    }
    if (!sellingPrice || sellingPrice <= 0) {
      setError('Please enter a valid selling price');
      return;
    }
    if (!productData) {
      setError('Product data is missing. Please go back and fill in product details.');
      return;
    }

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

      // Prepare product data for backend - send design as base64 directly
      const productPayload = {
        name: productTitle,
        description: description || '',
        category: mapCategory(productData.category),
        price: sellingPrice,
        design: productData.designFile || '', // Send base64 directly
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
        setSuccess('Product published successfully!');
        // Clear localStorage
        localStorage.removeItem('productCreationData');
        // Redirect to dashboard after 2 seconds
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
        setError(err.response?.data?.message || 'Failed to publish product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!productData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Review & Pricing - Artloom</title>
        <meta name="description" content="Review and set pricing for your product" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#F7F3EB',
        }}
      >
        <ReviewPricingHeader />

        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
          {/* Main Title */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Playfair Display'",
                fontSize: { xs: 32, md: 42 },
                fontWeight: 700,
                color: '#3B2A1A',
                mb: 1,
              }}
            >
              Review & Pricing
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 14, md: 16 },
                color: '#666',
              }}
            >
              Finalize your product details, set your profit margin and launch your creation
            </Typography>
          </Box>

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

          <Grid container spacing={3}>
            {/* Left Panel */}
            <Grid item xs={12} md={5}>
              <ProductDetailsCard
                productTitle={productTitle}
                setProductTitle={setProductTitle}
                description={description}
                setDescription={setDescription}
              />
              <PricingProfitCard
                sellingPrice={sellingPrice}
                setSellingPrice={setSellingPrice}
                profitMargin={profitMargin}
                setProfitMargin={setProfitMargin}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handlePublish}
                disabled={loading}
                sx={{
                  backgroundColor: '#3B2A1A',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  borderRadius: '12px',
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#2A1F15',
                  },
                  '&:disabled': {
                    backgroundColor: '#999',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : 'Publish Product'}
              </Button>
            </Grid>

            {/* Right Panel */}
            <Grid item xs={12} md={7}>
            <LivePreviewCard 
              category={productData.category}
              designFile={productData.designFile}
              productTitle={productTitle}
              selectedColor={productData.selectedColor}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

