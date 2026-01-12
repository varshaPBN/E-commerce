import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';

export default function AvatarUpload({ onChange, avatar }) {
  useEffect(() => {
    console.log('AvatarUpload - avatar prop:', avatar ? 'Image loaded' : 'No image');
  }, [avatar]);
  return (
    <Box sx={{ position: 'relative', mb: { xs: 3, md: 4 }, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box
        component="input"
        type="file"
        accept="image/png,image/jpeg"
        sx={{ display: 'none' }}
        id="avatar-upload"
        onChange={onChange}
      />
            <Box
        component="label"
        htmlFor="avatar-upload"
        sx={{
          width: { xs: 100, md: 120 },
          height: { xs: 100, md: 120 },
          borderRadius: '50%',
          border: '2px dashed #D0D0D0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            borderColor: '#3B2A1A',
            backgroundColor: '#F8F8F8',
          },
        }}
      >
        {avatar ? (
          <Box
            component="img"
            src={avatar}
            alt="Avatar preview"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
              display: 'block',
            }}
          />
        ) : (
          <>
            <CameraAltIcon sx={{ color: '#666', fontSize: { xs: 28, md: 32 }, mb: 0.5 }} />
            <Typography sx={{ fontSize: { xs: 10, md: 12 }, color: '#666', fontWeight: 500, textAlign: 'center', px: 1 }}>
              Upload your Avatar
            </Typography>
          </>
        )}
      </Box>
      <Box
        component="label"
        htmlFor="avatar-upload"
        sx={{
          position: 'absolute',
          bottom: -5,
          right: { xs: 'calc(50% - 16px)', md: -5 },
          width: { xs: 28, md: 32 },
          height: { xs: 28, md: 32 },
          borderRadius: '50%',
          backgroundColor: '#3B2A1A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
          '&:hover': {
            backgroundColor: '#2A1F15',
          },
        }}
      >
        <EditIcon sx={{ color: '#FFFFFF', fontSize: { xs: 14, md: 16 } }} />
      </Box>
      <Typography sx={{ fontSize: { xs: 10, md: 11 }, color: '#666', mt: 1, textAlign: 'center' }}>
        Min 400 x 400 px. PNG or JPG.
      </Typography>
    </Box>
  );
}

