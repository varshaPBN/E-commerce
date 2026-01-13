import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useRouter } from 'next/router';

export default function PurchasedItems({ order }) {
  const router = useRouter();

  if (!order || !order.items) return null;

  const items = order.items || [];

  return (
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
          fontSize: { xs: 20, md: 24 },
          fontWeight: 700,
          color: '#3B2A1A',
          mb: 3,
        }}
      >
        Purchased Items ({items.length})
      </Typography>

      {items.map((item, index) => {
        const product = item.productId || {};
        const details = [];
        if (item.color && item.color !== 'None') {
          details.push(`Color: ${item.color}`);
        }
        if (item.size && item.size !== 'None') {
          details.push(`Size: ${item.size}`);
        }
        details.push(`Qty: ${item.quantity}`);

        const totalPrice = (item.price || product.price || 0) * item.quantity;

        return (
          <Box
            key={item._id || index}
            sx={{
              display: 'flex',
              gap: 2,
              mb: index < items.length - 1 ? 3 : 0,
              pb: index < items.length - 1 ? 3 : 0,
              borderBottom: index < items.length - 1 ? '1px solid #E0E0E0' : 'none',
            }}
          >
            <Box
              component="img"
              src={product.design || '/products/default.png'}
              alt={product.name || 'Product'}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '8px',
                objectFit: 'cover',
                backgroundColor: '#F5F5F5',
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: '#666',
                  mb: 0.5,
                }}
              >
                {product.artistId?.name || product.artistId?.storeName || 'ArtisanMerch'}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#3B2A1A',
                  mb: 1,
                }}
              >
                {product.name || 'Product'}
              </Typography>
              {details.map((detail, idx) => (
                <Typography
                  key={idx}
                  sx={{
                    fontSize: 14,
                    color: '#666',
                    mb: 0.5,
                  }}
                >
                  {detail}
                </Typography>
              ))}
              <Link
                href={`/product-view/${product._id || item.productId}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (product._id || item.productId) {
                    router.push(`/product-view/${product._id || item.productId}`);
                  }
                }}
                sx={{
                  fontSize: 14,
                  color: '#3B2A1A',
                  textDecoration: 'none',
                  fontWeight: 600,
                  mt: 1,
                  display: 'inline-block',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Write a Review
              </Link>
            </Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: '#3B2A1A',
              }}
            >
              ₹{totalPrice.toFixed(2)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}



