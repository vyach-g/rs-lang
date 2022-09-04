import React from 'react';
import { Card, CardMedia, Container } from '@mui/material';

const SkeletonWordCard: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Card
        sx={{
          display: { sm: 'flex' },
          height: { xs: '510px', sm: '186px' },
          backgroundColor: '#F3F3F3',
          borderRadius: 3,
          marginBottom: '30px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
      >
        <CardMedia
          sx={{ width: { sm: 200 }, minHeight: 186, backgroundColor: '#E3E3E3' }}
          component="span"
        />
      </Card>
    </Container>
  );
};

export { SkeletonWordCard };
