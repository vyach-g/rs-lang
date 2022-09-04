import React from 'react';
import { Box, Typography } from '@mui/material';
import NoHardWordsImg from '../../../assets/no-hard.png';

const NoHardWords: React.FC = () => {
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom={true}>
        Отличная работа!
      </Typography>
      <Typography variant="h5" align="center" gutterBottom={true}>
        Все сложные слова выучены
      </Typography>
      <Box
        sx={{
          backgroundImage: `url(${NoHardWordsImg})`,
          height: '400px',
          width: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          marginBottom: '50px',
        }}
      ></Box>
    </>
  );
};

export { NoHardWords };
