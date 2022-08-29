import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Game } from './Game';
import { Settings } from './Settings';
import { Result } from './Result';

import { IAnswer } from './types';

const SavannahGame = () => {
  const [status, setStatus] = useState('TO_BE_STARTED');

  const [difficulty, setDifficulty] = useState('0');
  const [answers, setAnswers] = useState<IAnswer[]>([]);

  const onGameStart = (newDifficulty: string) => {
    setDifficulty(newDifficulty);
    setStatus('STARTED');
  };

  const onGameEnd = (answers: IAnswer[]) => {
    setAnswers(answers);
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
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        marginInline: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: '1.4rem',
          padding: '2rem 1rem',
          borderRadius: '1rem',
        }}
      >
        <Typography variant="h2">Savannah</Typography>
        {status === 'TO_BE_STARTED' ? (
          <Settings onGameStart={onGameStart} />
        ) : status === 'STARTED' ? (
          <Game newDifficulty={difficulty} onGameEnd={onGameEnd} onError={onError} />
        ) : (
          <Result onNextGame={onNextGame} currAnswers={answers} gameStatus={status} />
        )}
      </Box>
    </Box>
  );
};

export default SavannahGame;
