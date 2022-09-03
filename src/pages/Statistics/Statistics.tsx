import React from 'react';

import { Default } from '../../components/layout';

import { Box, Typography } from '@mui/material';

const Statistics = () => {
  return (
    <Default>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2">Statistics Page</Typography>
      </Box>
    </Default>
  );
};

export { Statistics };
