import Head from 'next/head';
import { Box, Container, Typography, Paper } from '@mui/material';
import BackButton from '@/components/common/BackButton';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Artloom</title>
        <meta name="description" content="Privacy Policy for Artloom platform" />
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
              Privacy Policy
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" paragraph>
                At Artloom ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                1. Information We Collect
              </Typography>
              
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                1.1 Personal Information
              </Typography>
              <Typography variant="body1" paragraph>
                We collect information that you provide directly to us, including:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    Name, email address, and contact information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Account credentials (username, password)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Payment and billing information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Profile information (store name, domain, logo, avatar)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Product designs and content you upload
                  </Typography>
                </li>
              </Box>

              <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                1.2 Automatically Collected Information
              </Typography>
              <Typography variant="body1" paragraph>
                When you use our Platform, we automatically collect certain information, including:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    Device information (IP address, browser type, operating system)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Usage data (pages visited, time spent, clicks)
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Cookies and similar tracking technologies
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Log files and analytics data
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                2. How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use the information we collect to:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    Provide, maintain, and improve our services
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Process transactions and send related information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Send you technical notices, updates, and support messages
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Respond to your comments, questions, and requests
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Monitor and analyze trends, usage, and activities
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Detect, prevent, and address technical issues and fraud
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Personalize your experience and provide relevant content
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    Comply with legal obligations
                  </Typography>
                </li>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                3. Information Sharing and Disclosure
              </Typography>
              <Typography variant="body1" paragraph>
                We do not sell your personal information. We may share your information in the following circumstances:
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                3.1 Service Providers
              </Typography>
              <Typography variant="body1" paragraph>
                We may share information with third-party service providers who perform services on our behalf, such as payment processing, fulfillment, email delivery, and analytics.
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                3.2 Business Transfers
              </Typography>
              <Typography variant="body1" paragraph>
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                3.3 Legal Requirements
              </Typography>
              <Typography variant="body1" paragraph>
                We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                3.4 With Your Consent
              </Typography>
              <Typography variant="body1" paragraph>
                We may share your information with your explicit consent or at your direction.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                4. Cookies and Tracking Technologies
              </Typography>
              <Typography variant="body1" paragraph>
                We use cookies and similar tracking technologies to track activity on our Platform and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
              </Typography>
              <Typography variant="body1" paragraph>
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                5. Data Security
              </Typography>
              <Typography variant="body1" paragraph>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                6. Your Rights and Choices
              </Typography>
              <Typography variant="body1" paragraph>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Access:</strong> Request access to your personal information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Correction:</strong> Request correction of inaccurate information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Deletion:</strong> Request deletion of your personal information
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Portability:</strong> Request transfer of your data to another service
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1" paragraph>
                    <strong>Opt-out:</strong> Opt-out of certain data processing activities
                  </Typography>
                </li>
              </Box>
              <Typography variant="body1" paragraph>
                To exercise these rights, please contact us using the information provided in the Contact section below.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                7. Data Retention
              </Typography>
              <Typography variant="body1" paragraph>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                8. Children's Privacy
              </Typography>
              <Typography variant="body1" paragraph>
                Our Platform is not intended for children under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                9. International Data Transfers
              </Typography>
              <Typography variant="body1" paragraph>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our Platform, you consent to the transfer of your information to these countries.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                10. Third-Party Links
              </Typography>
              <Typography variant="body1" paragraph>
                Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party sites you visit.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                11. Changes to This Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                12. California Privacy Rights
              </Typography>
              <Typography variant="body1" paragraph>
                If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete personal information, and the right to opt-out of the sale of personal information (though we do not sell personal information).
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                13. GDPR Rights (European Users)
              </Typography>
              <Typography variant="body1" paragraph>
                If you are located in the European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR), including the right to access, rectify, erase, restrict processing, object to processing, and data portability.
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                14. Contact Us
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </Typography>
              <Typography variant="body1" paragraph>
                Email: privacy@artloom.com
              </Typography>
              <Typography variant="body1" paragraph>
                For general inquiries: support@artloom.com
              </Typography>
            </Box>

            <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #e0e0e0' }}>
              <Typography variant="body2" color="text.secondary" align="center">
                By using Artloom, you acknowledge that you have read and understood this Privacy Policy.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

