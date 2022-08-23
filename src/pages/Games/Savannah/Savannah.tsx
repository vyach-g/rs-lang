import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Viewport } from './Viewport';
import { Settings } from './Settings';
import { Router } from './Router';

const Savannah = () => {
  const [difficulty, setDifficulty] = useState('0');
  const [status, setStatus] = useState('TO_BE_STARTED');

  const onGameStart = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setStatus('STARTED');
  };

  const onGameEnd = () => {
    setStatus('PENDING');
  };

  const onNextGame = () => {
    setStatus('TO_BE_STARTED');
  };

  const onError = () => {
    setStatus('SERVER_ERROR');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        rowGap: '2rem',
      }}
    >
      <Typography variant="h2">Savannah</Typography>
      {status === 'TO_BE_STARTED' ? (
        <Settings onGameStart={onGameStart} />
      ) : status === 'STARTED' ? (
        <Viewport newDifficulty={difficulty} onGameEnd={onGameEnd} />
      ) : (
        <Router onNextGame={onNextGame} />
      )}
    </Box>
  );
};

export { Savannah };
