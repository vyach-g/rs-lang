import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { randomInBetween } from '../../../utils/randomIdGenerator';
import { addWordStat, getWords } from '../../../api/apiCalls';
import { withAsync } from '../../../api/helpers/withAsync';

import { styled } from '@mui/material/styles';

import { IAnswer } from './types';
import { WordDTO } from '../../../api/apiCalls.types';
import { CountDown } from '../../../components/base';

import FavoriteIcon from '@mui/icons-material/Favorite';

import shuffleArray from '../../../utils/shuffleArray';

import { useLocation } from 'react-router-dom';
import { ShowcaseProps } from '../../../components/modules/Showcase/Showcase';

const ButtonCustom = styled('button')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgba(250,211,207,1)',
  fontWeight: '600',
  fontSize: '1rem',
  letterSpacing: '0.1rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
  padding: '0 0 0.6rem 0',
  maxWidth: '100rem',
  '&::first-letter': {
    color: 'red',
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    width: '0.8rem',
    height: '2.5px',
    background: '#C6B4CE',
    transition: 'width .25s ',
  },
  '&:hover::after': {
    width: '100%',
    background: 'rgba(250,211,207,1)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '0 0 0.4rem 0',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

interface Props {
  newDifficulty: number;
  onGameEnd: (arg: IAnswer[], longestSeries: number) => void;
}

const Game: React.FC<Props> = ({ newDifficulty, onGameEnd }) => {
  const difficulty = newDifficulty;

  const [currHP, setCurrHP] = useState(5);
  const [data, setData] = useState<WordDTO[] | null>(null);

  const [answer, setAnswer] = useState<WordDTO>();
  const [answerID, setAnswerID] = useState<number>(0);

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [asnwerOptions, setAsnwerOptions] = useState<(WordDTO | undefined)[]>([]);

  const [currSeries, setCurrSeries] = useState(0);
  const [longestSeries, setLongestSeries] = useState(0);

  const { state } = useLocation();

  useEffect(() => {
    setupData();
  }, []);

  const handleGameProcess = (event: React.MouseEvent) => {
    if (!answer) return;

    const buttonEl = event.currentTarget as HTMLButtonElement;
    const isCorrect = answer?.wordTranslate === buttonEl.textContent;

    const userAnswer = {
      word: answer,
      isCorrect: isCorrect,
    };

    if (isCorrect) {
      setCurrSeries(currSeries + 1);
    } else {
      setCurrSeries(0);
      setCurrHP(currHP - 1);

      if (currSeries > longestSeries) {
        setLongestSeries(currSeries);
      }
    }

    addWordStat(answer, isCorrect, 'savannah');

    if (currHP === 1 || answerID === 20) {
      onGameEnd([...answers, userAnswer], longestSeries);
    } else {
      setAnswers([...answers, userAnswer]);
      setupOptions();
    }
  };

  const setupOptions = (words?: WordDTO[]) => {
    let randIDs: Array<number> = [answerID];
    let randomizedWordList;
    let randID;

    while (randIDs.length !== 4) {
      randID = randomInBetween(0, 19);
      if (!randIDs.includes(randID)) {
        randIDs.push(randID);
      }
    }

    randIDs = shuffleArray(randIDs);

    if (data) {
      randomizedWordList = randIDs.map((id) => data[id]);
      setAnswer(data[answerID]);
    } else if (words) {
      randomizedWordList = randIDs.map((id) => words[id]);
      setAnswer(words[answerID]);
    }

    if (randomizedWordList) {
      setAsnwerOptions(randomizedWordList);
      setAnswerID(answerID + 1);
    }
  };

  const setupData = async () => {
    let randPageID = randomInBetween(0, 29);

    if (state) {
      const { page } = state as ShowcaseProps;
      randPageID = page;
    }

    const { response } = await withAsync(() => getWords(difficulty, randPageID));

    if (response) {
      setData(shuffleArray(response.data));
      setupOptions(response.data);
    }
  };

  const onCountZero = () => {
    setAnswers([...answers, { word: answer, isCorrect: false }]);
    setupOptions();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {data ? (
        <>
          <CountDown onCountZero={onCountZero} resetOnChange={answerID} />
          <Box
            sx={{
              display: 'flex',
              columnGap: '0.5rem',
              position: 'absolute',
              top: ['none', '2.6rem'],
              bottom: ['2.6rem', 0, 0],
            }}
          >
            <FavoriteIcon
              sx={{
                fill: `${currHP > 0 ? 'red' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 1 ? 'red' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 2 ? 'red' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 3 ? 'red' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 4 ? 'red' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box
            sx={{
              color: 'rgba(250,211,207, 1)',
              textTransform: 'uppercase',
              fontSize: ['1.2rem', '1.4rem'],
              fontWeight: '600',
            }}
          >
            ?????????? <span style={{ color: '#C6B4CE' }}>- {answer?.word}</span>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'row'],
              columnGap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {asnwerOptions.map((word) => (
              <ButtonCustom key={word?.id} onClick={handleGameProcess}>
                {word?.wordTranslate}
              </ButtonCustom>
            ))}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '1rem',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#C6B4CE',
              textTransform: 'uppercase',
              fontSize: '1.2rem',
              letterSpacing: '0.05rem',
              fontWeight: '600',
            }}
          >
            ?????????????? ??????????
          </Typography>
          <CircularProgress sx={{ color: '#C6B4CE', marginTop: '0.5rem' }} />
        </Box>
      )}
    </Box>
  );
};

export { Game };
