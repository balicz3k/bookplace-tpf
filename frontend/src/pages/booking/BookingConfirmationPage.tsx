import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const offerName = location.state?.offerName || 'wybranego obiektu';
  const photoUrl = location.state?.photoUrl;

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', borderRadius: 4 }}>
        <Box sx={{ mb: 3 }}>
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#4caf50" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Rezerwacja potwierdzona!
        </Typography>
        {photoUrl && (
          <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src={photoUrl}
              alt={offerName}
              sx={{
                width: '100%',
                maxHeight: 200,
                objectFit: 'cover',
                borderRadius: 4,
                boxShadow: 2,
              }}
            />
          </Box>
        )}
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1.1rem' }}>
          Udało się! Twoja rezerwacja dla <strong>{offerName}</strong> zakończyła się sukcesem.
          Więcej informacji znajdziesz w zakładce swoich rezerwacji.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="large"
            onClick={() => navigate('/')}
            sx={{ borderRadius: 25, px: 4, py: 1.5, textTransform: 'none', fontWeight: 700 }}
          >
            Strona główna
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/my-bookings')}
            sx={{ borderRadius: 25, px: 4, py: 1.5, textTransform: 'none', fontWeight: 700 }}
          >
            Moje rezerwacje
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookingConfirmationPage;

