import React from 'react';

import { Link } from 'react-router-dom';
import { RoutePaths } from '../../config/routes';

import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

const Registration = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2">Registration</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: '1rem',
          gap: '1rem',
        }}
      >
        Register and log in <br />
        <Link to={RoutePaths.Login}>
          <Button variant="contained">Login</Button>
        </Link>
      </Box>
    </Box>
  );
};

export { Registration };
