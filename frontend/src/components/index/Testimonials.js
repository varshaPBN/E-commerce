import React from 'react';
import { Box, Typography, Container, Card, Avatar, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Influencer',
      avatar: 'SJ',
      image: 'https://via.placeholder.com/56x56/D2B48C/8B4513?text=SJ',
      quote: 'I used to spend hours packing orders. Now I just upload my art and ArtLoom handles everything. My sales have tripled in 3 months!',
      stars: 4,
      topSeller: false,
    },
    {
      name: 'Marcus Chen',
      role: 'Content Creator',
      avatar: 'MC',
      image: 'https://via.placeholder.com/56x56/8B4513/FFFFFF?text=MC',
      quote: "The print quality is unmatched. My customers love the hoodies and art prints. It's the best way to monetize my Instagram following effortlessly.",
      stars: 5,
      topSeller: true,
    },
    {
      name: 'Elare Vane',
      role: 'Content Creator',
      avatar: 'EV',
      image: 'https://via.placeholder.com/56x56/BC9A6A/FFFFFF?text=EV',
      quote: 'Finally, a platform that respects artists. The profit margins are great, and the dashboard makes tracking my earnings incredibly simple.',
      stars: 4,
      topSeller: false,
    },
  ];

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#FFFFFF' }}>
      <Container maxWidth="lg">
        <Typography
          sx={{
            fontFamily: "'Playfair Display'",
            fontSize: { xs: 32, md: 42 },
            fontWeight: 700,
            color: '#3B2A1A',
            textAlign: 'center',
            mb: 6,
          }}
        >
          Creator Success Stories
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: '16px',
                p: 3,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                position: 'relative',
                backgroundColor: '#FFFFFF',
              }}
            >
              {testimonial.topSeller && (
                <Chip
                  label="Top Seller"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: '#FFF9E6',
                    color: '#3B2A1A',
                    fontWeight: 600,
                    fontSize: 10,
                  }}
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{ width: 56, height: 56, bgcolor: '#9C6ADE', fontWeight: 600 }}
                >
                  {testimonial.avatar}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600, fontSize: 16, color: '#3B2A1A' }}>{testimonial.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#666' }}>{testimonial.role}</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 14, color: '#666', lineHeight: 1.6, mb: 2 }}>"{testimonial.quote}"</Typography>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 16, color: i < testimonial.stars ? '#FFC107' : '#E0E0E0' }} />
                ))}
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

