import Head from 'next/head';
import { Box, Container, Typography, Paper } from '@mui/material';
import BackButton from '@/components/common/BackButton';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Artloom</title>
        <meta name="description" content="Terms of Service for Artloom platform" />
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
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{ mb: 4, fontFamily: 'Playfair Display' }}
            >
              Terms of Service
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                By accessing and using Artloom ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                2. Description of Service
              </Typography>
              <Typography variant="body1" paragraph>
                Artloom is an e-commerce platform that enables artists and creators ("Artists") to design, create, and sell custom merchandise without holding inventory. The Platform provides tools for product design, order management, and fulfillment services.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                3. User Accounts
              </Typography>
              <Typography variant="body1" paragraph>
                To use certain features of the Platform, you must register for an account. You agree to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    Provide accurate, current, and complete information during registration
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Maintain and promptly update your account information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Maintain the security of your password and identification
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Accept all responsibility for any activity that occurs under your account
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                4. Artist Responsibilities
              </Typography>
              <Typography variant="body1" paragraph>
                As an Artist using the Platform, you agree to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    Create original designs or have proper authorization to use designs you upload
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Not upload content that infringes on intellectual property rights, is defamatory, obscene, or violates any laws
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Set fair and reasonable prices for your products
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Respond to customer inquiries and resolve disputes in a timely manner
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                5. Intellectual Property Rights
              </Typography>
              <Typography variant="body1" paragraph>
                You retain all rights to your original designs and content. By uploading content to the Platform, you grant Artloom a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content solely for the purpose of operating and promoting the Platform.
              </Typography>
              <Typography variant="body1" paragraph>
                You represent and warrant that you own or have the necessary rights to all content you upload and that such content does not infringe on any third-party rights.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                6. Payment and Fees
              </Typography>
              <Typography variant="body1" paragraph>
                The Platform may charge fees for certain services, including but not limited to transaction fees, processing fees, and subscription fees. All fees will be clearly disclosed before you incur them. You are responsible for all applicable taxes.
              </Typography>
              <Typography variant="body1" paragraph>
                Payments to Artists will be processed according to the payment schedule and terms specified in your account settings. Artloom reserves the right to withhold payments in cases of suspected fraud or violation of these Terms.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                7. Product Fulfillment
              </Typography>
              <Typography variant="body1" paragraph>
                Artloom partners with third-party fulfillment services to produce and ship products. While we strive to ensure quality and timely delivery, we are not responsible for delays or issues caused by fulfillment partners or shipping carriers.
              </Typography>
              <Typography variant="body1" paragraph>
                Artists are responsible for ensuring their designs meet production requirements and quality standards. Artloom reserves the right to reject designs that do not meet our quality guidelines.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                8. Prohibited Uses
              </Typography>
              <Typography variant="body1" paragraph>
                You agree not to use the Platform to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    Violate any applicable laws or regulations
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Infringe on intellectual property rights
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Upload malicious code, viruses, or harmful software
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Engage in fraudulent or deceptive practices
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Harass, abuse, or harm other users
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                9. Termination
              </Typography>
              <Typography variant="body1" paragraph>
                We may terminate or suspend your account and access to the Platform immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </Typography>
              <Typography variant="body1" paragraph>
                You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                10. Disclaimers and Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </Typography>
              <Typography variant="body1" paragraph>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARTLOOM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                11. Indemnification
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to indemnify and hold harmless Artloom, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the Platform, your content, or your violation of these Terms.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                12. Changes to Terms
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through a notice on the Platform. Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                13. Governing Law
              </Typography>
              <Typography variant="body1" paragraph>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Artloom operates, without regard to its conflict of law provisions.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                14. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms of Service, please contact us at:
              </Typography>
              <Typography variant="body1" paragraph>
                Email: support@artloom.com
              </Typography>
            </Box>

            <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="body2" color="text.secondary" align="center">
                By using Artloom, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

