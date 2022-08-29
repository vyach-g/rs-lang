import React, { useRef } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { GameWordCard } from '../../../components/base';

import { useNavigate } from 'react-router-dom';
import { IAnswer } from './types';

import { styled } from '@mui/material/styles';

const ResultsCustom = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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

const AnswersCustom = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '12rem',
  overflowY: 'scroll',
  padding: '0 2rem',
  width: '100%',
  marginLeft: '-3rem',
}));

const AnswersList = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '0.5rem',
  margin: '0',
  padding: '0',
});

const ButtonCustom = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  fontWeight: '600',
  borderRadius: '3px',
  borderWidth: '2px',
  borderColor: 'black',
  color: 'black',
  padding: '.3rem 2rem',
  maxWidth: '15rem',
  width: '100%',
  '&:hover': {
    borderColor: 'black',
    borderWidth: '2px',
    backgroundColor: '#ff4d4d',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
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
      <Box sx={{ color: '#cc0000', textAlign: 'center', fontSize: '1.1rem' }}>
        An error occured on the server, please, try starting a new game
      </Box>
    ) : (
      <AnswersCustom>
        <AnswersList sx={{ color: '#009933' }}>
          {correctAnswers.map((answer, index) => (
            <GameWordCard key={index} answer={answer} />
          ))}
        </AnswersList>
        <AnswersList sx={{ color: '#cc0000' }}>
          {wrongAnswers.map((answer, index) => (
            <GameWordCard key={index} answer={answer} />
          ))}
        </AnswersList>
      </AnswersCustom>
    );

  return (
    <ResultsCustom>
      <Typography variant="h4">Отчет по игре</Typography>
      {GameResults}
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
