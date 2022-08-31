import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import { GameWordCard } from '../../../components/base';

import { useNavigate } from 'react-router-dom';
import { IAnswer } from './types';

import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';

const ResultsCustom = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: 'white',
  padding: '4rem 3rem 3rem 3rem',
  borderRadius: '0.5rem',
  rowGap: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '3rem 2rem 2rem 2rem',
  },
}));

const ResultsMain = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  maxWidth: '14rem',
  width: '100%',
  rowGap: '1.5rem',
  '& ::-webkit-scrollbar': {
    width: '8px',
  },
  '& ::-webkit-scrollbar-track': {
    backgroundColor: '#e4e4e4',
    borderRadius: '100px',
  },
  '& ::-webkit-scrollbar-thumb': {
    backgroundColor: 'black',
    backgroundClip: 'content-box',
    borderRadius: '100px',
  },
});

const AnswersCustom = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  maxHeight: '12rem',
  overflowY: 'scroll',
  padding: '0 2rem',
  width: '100%',
  marginLeft: '-3rem',
});

const AnswersList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.3rem',
  margin: '0',
  padding: '0',
});

const ButtonCustom = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  fontWeight: '600',
  borderRadius: '3px',
  border: '2px solid black',
  color: 'black',
  padding: '.2rem 2rem',
  maxWidth: '15rem',
  width: '100%',
  '&:hover': {
    border: '2px solid black',
    backgroundColor: 'rgb(243, 120, 120)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const CloseButton = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  jusrifyContent: 'center',
  backgroundColor: 'transparent',
  position: 'absolute',
  top: '1.2rem',
  right: '0.7rem',
  margin: '0',
  padding: '0',
  border: 'none',
  cursor: 'pointer',
  color: 'black',
  '& svg': {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    right: '50%',
    top: '1rem',
    transform: 'translate(50%, 0)',
  },
}));

interface Props {
  onNextGame: () => void;
  currAnswers: IAnswer[] | [];
  gameStatus: string;
}

const Result: React.FC<Props> = ({ onNextGame, currAnswers, gameStatus }) => {
  const correctAnswers = currAnswers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.word);
  const wrongAnswers = currAnswers
    .filter((answer) => !answer.isCorrect)
    .map((answer) => answer.word);

  const navigate = useNavigate();

  const handleNewGame = () => {
    onNextGame();
  };

  const handleExit = () => {
    navigate('/games');
  };

  const GameResults =
    gameStatus === 'SERVER_ERROR' ? (
      <Box sx={{ color: '#A24C43', textAlign: 'center', fontSize: '1.1rem' }}>
        An error occured on the server, please, try starting a new game
      </Box>
    ) : (
      <AnswersCustom>
        <AnswersList sx={{ color: '#009933' }}>
          {correctAnswers.map((answer, index) => (
            <GameWordCard key={index} answer={answer} />
          ))}
        </AnswersList>
        <AnswersList sx={{ color: '#A24C43' }}>
          {wrongAnswers.map((answer, index) => (
            <GameWordCard key={index} answer={answer} />
          ))}
        </AnswersList>
      </AnswersCustom>
    );

  return (
    <ResultsCustom>
      <Typography variant="h4" sx={{ fontSize: ['2rem', '3rem'] }}>
        Отчет по игре
      </Typography>
      <CloseButton onClick={handleExit}>
        <CloseIcon />
      </CloseButton>
      <ResultsMain>{GameResults}</ResultsMain>
      <ButtonCustom variant="outlined" onClick={handleNewGame}>
        Сыграть ещё
      </ButtonCustom>
      <ButtonCustom variant="outlined" onClick={handleExit}>
        К выбору игр
      </ButtonCustom>
    </ResultsCustom>
  );
};

export { Result };
