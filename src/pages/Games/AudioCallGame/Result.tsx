import React, { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { GameWordCard } from '../../../components/base';

import { getUserStatistics, updateUserStatistics } from '../../../api/apiCalls';
import { withAsync } from '../../../api/helpers/withAsync';
import { SignInDTO } from '../../../api/apiCalls.types';
import { useNavigate } from 'react-router-dom';
import { IAnswer } from './types';

import storage from '../../../storage/storage';

import { styled } from '@mui/material/styles';

const ResultsCustom = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '0.5rem',
  rowGap: '1.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '2rem',
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

interface Props {
  onNextGame: () => void;
  currAnswers: IAnswer[] | [];
  longestSeries: number;
  gameStatus: string;
}

const Result: React.FC<Props> = ({ onNextGame, currAnswers, longestSeries, gameStatus }) => {
  const correctAnswers = currAnswers.filter((answer) => answer.isCorrect);
  const wrongAnswers = currAnswers.filter((answer) => !answer.isCorrect);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(longestSeries);
    handleUpdateStats();
  }, []);

  const handleNewGame = () => {
    onNextGame();
  };

  const handleExit = () => {
    navigate('/games');
  };

  const handleUpdateStats = async () => {
    const auth = storage.getItem<SignInDTO>('auth');

    if (!auth) return;

    const { response, error } = await withAsync(() => getUserStatistics(auth.userId));

    const timeStamp = Date.now();

    if (error) {
      await updateUserStatistics(auth.userId, {
        learnedWords: correctAnswers.length,
        optional: {
          [timeStamp]: {
            audiocall: {
              totalWords: currAnswers.length,
              correctAnswers: correctAnswers.length,
              wrongAnswers: wrongAnswers.length,
              longestSeries: longestSeries,
            },
          },
        },
      });
    }

    if (response && response.status == 200) {
      const { data } = response;
      const { learnedWords, ...rest } = data;

      await updateUserStatistics(auth.userId, {
        learnedWords: learnedWords + currAnswers.length,
        optional: {
          ...rest.optional,
          [timeStamp]: {
            audiocall: {
              totalWords: currAnswers.length,
              correctAnswers: correctAnswers.length,
              wrongAnswers: wrongAnswers.length,
              longestSeries: longestSeries,
            },
          },
        },
      });
    }
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
            <GameWordCard key={index} answer={answer.word} />
          ))}
        </AnswersList>
        <AnswersList sx={{ color: '#A24C43' }}>
          {wrongAnswers.map((answer, index) => (
            <GameWordCard key={index} answer={answer.word} />
          ))}
        </AnswersList>
      </AnswersCustom>
    );

  return (
    <ResultsCustom>
      <Typography variant="h4" sx={{ fontSize: ['2rem', '3rem'] }}>
        Отчет по игре
      </Typography>
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
