import Head from 'next/head';
import { Box, Container, Typography, Paper, Link, Divider } from '@mui/material';
import BackButton from '@/components/common/BackButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';

export default function Help() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on 'Get Started' on the homepage and enter your email address. You'll receive an OTP (One-Time Password) via email to verify your account. Once verified, you can complete your store setup."
    },
    {
      question: "How do I set up my store?",
      answer: "After signing up, you'll be guided through the store setup process. You'll need to provide your store name, domain, artist name, logo, and avatar. All of these can be changed later in your dashboard settings."
    },
    {
      question: "What file formats are supported for uploads?",
      answer: "For logos, avatars, and product designs, we support JPG and PNG formats only. Please ensure your images meet the minimum size requirements (400x400px for avatars)."
    },
    {
      question: "How do I create and sell products?",
      answer: "Navigate to the 'Design' section in your dashboard. Upload your design, choose product categories, colors, and sizes. Set your pricing and publish your products to start selling."
    },
    {
      question: "How do I receive payments?",
      answer: "Payments are processed automatically when customers purchase your products. You can view your earnings and payment schedule in your dashboard under the 'Payments' section."
    },
    {
      question: "Can I customize my storefront?",
      answer: "Yes! You can customize your store name, domain, logo, and avatar. Additional customization options are available in your store settings."
    },
    {
      question: "What if I have issues with my order?",
      answer: "If you experience any issues with orders, please contact our support team immediately. We're here to help resolve any problems with product quality, shipping, or fulfillment."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach us via email at support@artloom.com, call us at +1 (555) 123-4567, or use the live chat feature available in your dashboard."
    }
  ];

  return (
    <>
      <Head>
        <title>Help & Support - Artloom</title>
        <meta name="description" content="Get help and support for Artloom platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#FDF8F2',
          py: 4,
        }}
      >
        <BackButton />
        <Container maxWidth="md" sx={{ px: { xs: 2, md: 4 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 6 },
              borderRadius: 4,
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <HelpOutlineIcon sx={{ fontSize: 48, color: '#3B2A1A', mb: 2 }} />
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{ mb: 2, fontFamily: 'Playfair Display' }}
              >
                Help & Support
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We're here to help you succeed on Artloom
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Contact Options */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Get in Touch
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ color: '#3B2A1A' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Link
                      href="mailto:support@artloom.com"
                      sx={{
                        color: '#3B2A1A',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      support@artloom.com
                    </Link>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ color: '#3B2A1A' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Link
                      href="tel:+15551234567"
                      sx={{
                        color: '#3B2A1A',
                        textDecoration: 'none',
                        fontWeight: 600,
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      +1 (555) 123-4567
                    </Link>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <ChatIcon sx={{ color: '#3B2A1A' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Live Chat
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#3B2A1A', fontWeight: 600 }}>
                      Available in your dashboard
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* FAQ Section */}
            <Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Frequently Asked Questions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {faqs.map((faq, index) => (
                  <Box key={index}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ mb: 1, color: '#3B2A1A' }}
                    >
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {faq.answer}
                    </Typography>
                    {index < faqs.length - 1 && <Divider sx={{ mt: 3 }} />}
                  </Box>
                ))}
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Additional Resources */}
            <Box>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Additional Resources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Link
                  href="/terms"
                  sx={{
                    color: '#3B2A1A',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  sx={{
                    color: '#3B2A1A',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  Privacy Policy
                </Link>
              </Box>
            </Box>

            {/* Support Hours */}
            <Box sx={{ mt: 6, p: 3, backgroundColor: '#F4ECDF', borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Support Hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monday - Friday: 9:00 AM - 6:00 PM EST
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Saturday - Sunday: 10:00 AM - 4:00 PM EST
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                We typically respond within 24 hours during business days.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

