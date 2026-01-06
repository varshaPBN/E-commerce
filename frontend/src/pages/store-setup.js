import Head from 'next/head';
import { Box, Container } from '@mui/material';
import StoreSetupHeader from '@/components/store-setup/StoreSetupHeader';
import AvatarUpload from '@/components/store-setup/AvatarUpload';
import DecorativeImages from '@/components/store-setup/DecorativeImages';
import StoreSetupForm from '@/components/store-setup/StoreSetupForm';

export default function StoreSetup() {
  return (
    <>
      <Head>
        <title>Let's build your store now - Artloom</title>
        <meta name="description" content="Set up your store on Artloom" />
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
        <StoreSetupHeader />
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: '#F5ECE3',
              borderRadius: '24px',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              mt: 4,
              mb: 4,
              overflow: { xs: 'auto', lg: 'hidden' },
              minHeight: '600px',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 4,
                p: { xs: 3, md: 6 },
                overflow: 'visible',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', lg: 'flex-start' },
                }}
              >
                <AvatarUpload />
                <DecorativeImages />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 10,
                  overflow: 'visible',
                  pointerEvents: 'auto',
                }}
              >
                <StoreSetupForm />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

