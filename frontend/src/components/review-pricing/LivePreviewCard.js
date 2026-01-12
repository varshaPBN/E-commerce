import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LockIcon from '@mui/icons-material/Lock';

export default function LivePreviewCard({ category, designFile, productTitle }) {
  // Get product preview image based on category
  const getCategoryImage = (cat) => {
    const categoryImages = {
      'Tshirt': 'https://images.unsplash.com/photo-1651761179569-4ba2aa054997?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Hat': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Hats': 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Mug': 'https://images.unsplash.com/photo-1650959858546-d09833d5317b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Bag': 'https://images.unsplash.com/photo-1732963947955-858ad7d5e540?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'Bags': 'https://images.unsplash.com/photo-1732963947955-858ad7d5e540?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
    return categoryImages[cat] || categoryImages['Tshirt'];
  };

  const previewImage = getCategoryImage(category || 'Tshirt');
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        p: 3,
        height: 'fit-content',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <VisibilityIcon sx={{ color: '#3B2A1A', fontSize: 20 }} />
          <Typography
            sx={{
              fontFamily: "'Playfair Display'",
              fontSize: { xs: 18, md: 20 },
              fontWeight: 700,
              color: '#3B2A1A',
            }}
          >
            Live Preview
          </Typography>
        </Box>
        <IconButton
          sx={{
            color: '#3B2A1A',
            '&:hover': {
              backgroundColor: 'rgba(59, 42, 26, 0.1)',
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

        <Box
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          p: 4,
          textAlign: 'center',
          mb: 2,
          height: '600px',
          width: '600px',
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
          {designFile && (
            <Box
              component="img"
              src={designFile}
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

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 0.5,
          mt: 2,
        }}
      >
        <LockIcon sx={{ fontSize: 16, color: '#666' }} />
        <Typography
          sx={{
            fontSize: 12,
            color: '#666',
          }}
        >
          Your design is protected until you publish
        </Typography>
      </Box>
    </Box>
  );
}

