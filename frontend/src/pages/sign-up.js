import Head from 'next/head';
import { Box, Card, Typography, Link } from '@mui/material';
import SignUpForm from '@/components/signup/SignUpForm';
import BackButton from '@/components/common/BackButton';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Get Started - Artloom</title>
        <meta name="description" content="Sign up to start selling your merchandise on Artloom" />
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
        <Box sx={{ maxWidth: 1000, mx: "auto" }}>
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
          }}
        >
          {/* LEFT PANEL */}
          <Box
            sx={{
              width: "45%",
              bgcolor: "#F4ECDF",
              p: 4,
              display: { xs: "none", lg: "block" },
            }}
          >
            <Box 
              sx={{ 
                position: "relative",
                width: 300,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F4ECDF",
                py: 4,
                minHeight: 320,
              }}
            >
              <Box
                component="img"
                src="/image 127.png"
                alt="Sign Up"
                sx={{
                  borderRadius: 4,
                  maxWidth: "100%",
                  maxHeight: 450,
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* RIGHT PANEL */}
          <Box sx={{ width: { xs: "100%", lg: "55%" }, p: 6 }}>
            <SignUpForm />
          </Box>
        </Card>
      </Box>
    </>
  );
}

