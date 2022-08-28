import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';
import { Box, Container, Typography } from '@mui/material';

const Showcase: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center">
        Закрепите знания в играх
        <Box>
          <Link to={RoutePaths.SprintGame}>Спринт</Link>
          <Link to={RoutePaths.AudioCallGame}>Аудиовызов</Link>
        </Box>
      </Typography>
    </Container>
  );
};

export { Showcase };
