import Head from 'next/head';
import { Box, Card, Typography, Alert, Link } from '@mui/material';
import BackButton from '@/components/common/BackButton';
import AvatarUpload from '@/components/store-setup/AvatarUpload';
import StoreSetupForm from '@/components/store-setup/StoreSetupForm';
import { useState } from 'react';

export default function StoreSetup() {
  const [avatar, setAvatar] = useState(null);
  const [avatarError, setAvatarError] = useState('');
  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type - only JPG and PNG allowed
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isValidType = allowedTypes.includes(file.type) || ['jpg', 'jpeg', 'png'].includes(fileExtension);
      
      if (!isValidType) {
        setAvatarError('Please upload only JPG or PNG files.');
        e.target.value = ''; // Reset file input
        return;
      }
      
      setAvatarError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // base64 data URL
        console.log('Avatar uploaded:', reader.result.substring(0, 50) + '...');
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <Head>
        <title>Let's build your store now - Artloom</title>
        <meta name="description" content="Set up your store on Artloom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ minHeight: "100vh", p: 4 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 6,
            mb: 2,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="Artloom Logo"
            sx={{
              height: "60px",
              cursor: "pointer",
            }} />

          <Link
            href="/help"
            sx={{
              fontSize: 14,
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Need Help?
          </Link>
        </Box>

        {/* BACK BUTTON */}
        <Box sx={{ maxWidth: 1000, mx: "auto", mb: 1 }}>
          <BackButton fallbackPath="/" noBottomMargin={true} compact={true} />
        </Box>

        {/* MAIN CARD */}
        <Card
          sx={{
            maxWidth: 1000,
            mx: "auto",
            display: "flex",
            borderRadius: 6,
            boxShadow: "0 50px 90px rgba(0,0,0,0.3)",
            overflow: "hidden",
            mt: -2,
          }}
        >
          {/* LEFT PANEL */}
          <Box
            sx={{
              width: "45%",
              bgcolor: "#F4ECDF",
              p: 4,
              display: { xs: "none", lg: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box 
              sx={{ 
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 4,
              }}
            >
              <AvatarUpload onChange={handleAvatarChange} avatar={avatar}/>
              {avatarError && (
                <Alert severity="error" sx={{ mt: 2, width: '100%', maxWidth: 300 }}>
                  {avatarError}
                </Alert>
              )}
              <Box
                component="img"
                src="/store-setup.avif"
                alt="Store Setup"
                sx={{
                  borderRadius: 4,
                  maxWidth: "100%",
                  maxHeight: 550,
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  mt: 2,
                }}
              />
            </Box>
          </Box>

          {/* RIGHT PANEL */}
          <Box sx={{ width: { xs: "100%", lg: "55%" }, p: 6 }}>
            {/* Show avatar upload on mobile since left panel is hidden */}
            <Box sx={{ display: { xs: "flex", lg: "none" }, flexDirection: "column", alignItems: "center", mb: 4 }}>
              <AvatarUpload onChange={handleAvatarChange} avatar={avatar}/>
              {avatarError && (
                <Alert severity="error" sx={{ mt: 2, width: '100%', maxWidth: 300 }}>
                  {avatarError}
                </Alert>
              )}
            </Box>
            <StoreSetupForm avatar={avatar}/>
          </Box>
        </Card>
      </Box>
    </>
  );
}

