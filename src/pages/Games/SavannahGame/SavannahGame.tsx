import React, { useState } from 'react';

import { Game } from './Game';
import { Settings } from './Settings';
import { Result } from './Result';

import { styled } from '@mui/material/styles';

import BgImg from '../../../assets/savannah-bg.svg';
import CloseIcon from '@mui/icons-material/Close';
import { IAnswer } from './types';
import { useNavigate } from 'react-router-dom';

const GameContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1.4rem',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${BgImg})`,
  backgroundSize: 'cover',
  width: '100vw',
  height: '100vh',

  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

const CloseButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  jusrifyContent: 'center',
  position: 'absolute',
  left: '2rem',
  top: '2rem',
  backgroundColor: 'transparent',
  margin: '0',
  padding: '0',
  border: 'none',
  cursor: 'pointer',
  color: 'rgba(250,211,207,1)',
  '& svg': {
    fontSize: '1.8rem',
  },
  '&:hover': {
    '& svg ': {
      fill: '#C6B4CE',
    },
  },
});

const SavannahGame = () => {
  const [status, setStatus] = useState('TO_BE_STARTED');

  const [difficulty, setDifficulty] = useState(0);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [longestSeries, setLongestSeries] = useState(0);

  const navigate = useNavigate();

  const onGameStart = (newDifficulty: number) => {
    setDifficulty(newDifficulty);
    setStatus('STARTED');
  };

  const onGameEnd = (answers: IAnswer[], longestSeries: number) => {
    setAnswers(answers);
    setLongestSeries(longestSeries);

    setStatus('PENDING');
  };

  const onNextGame = () => {
    setStatus('TO_BE_STARTED');
  };

  const onGameClose = () => {
    navigate('/games');
  };

  return (
    <GameContainer>
      {status === 'TO_BE_STARTED' ? (
        <>
          <CloseButton onClick={onGameClose}>
            <CloseIcon />
          </CloseButton>
          <Settings onGameStart={onGameStart} />
        </>
      ) : status === 'STARTED' ? (
        <>
          <CloseButton onClick={onGameClose}>
            <CloseIcon />
          </CloseButton>
          <Game newDifficulty={difficulty} onGameEnd={onGameEnd} />
        </>
      ) : (
        <Result
          onNextGame={onNextGame}
          currAnswers={answers}
          longestSeries={longestSeries}
          gameStatus={status}
        />
      )}
    </GameContainer>
  );
};

export default SavannahGame;
