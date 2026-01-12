import Head from 'next/head';
import { Box, Container } from '@mui/material';
import SignUpHeader from '@/components/signup/SignUpHeader';
import SignUpForm from '@/components/signup/SignUpForm';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Get Started - Artloom</title>
        <meta name="description" content="Sign up to start selling your merchandise on Artloom" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#FDF8F2',
        }}
      >
        <SignUpHeader />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              minHeight: 'calc(100vh - 100px)',
              borderRadius: '75px',
              overflow: 'hidden',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#FFFFFF',
              mt: 2,
              mb: 4,
            }}
          >
            <Box
              component="img"
              src="/image 126.png"
              alt="Sign Up"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: { xs: 'none', lg: 'block' },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                py: { xs: 4, md: 6 },
              }}
            >
              <SignUpForm />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

