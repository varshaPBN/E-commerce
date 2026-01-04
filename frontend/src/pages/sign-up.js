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
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#FFFFFF',
              mt: 4,
              mb: 4,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: { xs: 'none', lg: 'block' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(139, 69, 19, 0.4), rgba(139, 69, 19, 0.6))',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '180px',
                  height: '360px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '28px',
                  border: '8px solid #000000',
                  boxShadow: '0px 12px 48px rgba(0,0,0,0.5)',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '8px',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#2a2a2a',
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80"
                    alt="Phone Screen"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.9,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: '#FF0000',
                      border: '4px solid #FFFFFF',
                      boxShadow: '0px 4px 16px rgba(255,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

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

