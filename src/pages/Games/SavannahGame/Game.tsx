import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import generateId, { randomInBetween } from '../../../utils/randomIdGenerator';
import { getWords } from '../../../api/apiCalls';

import { styled } from '@mui/material/styles';

import { IAnswer } from './types';
import { WordDTO } from '../../../api/apiCalls.types';
import { CountDown } from '../../../components/base';

import FavoriteIcon from '@mui/icons-material/Favorite';

const ButtonCustom = styled('button')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '3px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgba(250,211,207,1)',
  fontWeight: '600',
  fontSize: '0.9rem',
  letterSpacing: '0.1rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
  marginTop: '1rem',
  '&::first-letter': {
    color: 'red',
  },
  '&::after': {
    content: '""',
    display: 'block',
    marginTop: '0.5rem',
    width: '0.7rem',
    height: '2.5px',
    background: '#C6B4CE',
    transition: 'width .25s',
  },
  '&:hover::after': {
    width: '100%',
    background: 'rgba(250,211,207,1)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

interface Props {
  newDifficulty: string;
  onGameEnd: (arg: IAnswer[]) => void;
  onError: () => void;
}

const Game: React.FC<Props> = ({ newDifficulty, onGameEnd, onError }) => {
  const difficulty = newDifficulty;
  const [currHP, setCurrHP] = useState(5);
  const [currWord, setCurrWord] = useState<WordDTO>();
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [data, setData] = useState<WordDTO[] | null>(null);
  const [asnwerOptions, setAsnwerOptions] = useState<(WordDTO | undefined)[]>([]);

  useEffect(() => {
    setupData();
  }, []);

  const handleAnswer = (event: React.MouseEvent) => {
    let newHP;
    let answer = {
      word: currWord,
      isCorrect: true,
    };

    event.preventDefault();
    (event.currentTarget as HTMLButtonElement).disabled = true;

    if (currWord?.wordTranslate !== (event.target as HTMLButtonElement).textContent) {
      newHP = currHP - 1;
      setCurrHP(newHP);
      answer.isCorrect = false;
    }

    if (newHP === 0) {
      showResults();
      return;
    }

    setAnswers([...answers, answer]);

    setupWords();

    (event.currentTarget as HTMLButtonElement).disabled = false;
  };

  const setupData = async () => {
    const randPageID = randomInBetween(0, 29);
    const words = await getWords(+difficulty, randPageID).then((responce) => responce.data);

    setData(words);
    setupWords(words);
  };

  const setupWords = (words?: WordDTO[]) => {
    const answerID = randomInBetween(0, 19);

    let randIDs: Array<number> = [answerID];
    let randID;

    while (randIDs.length !== 4) {
      randID = randomInBetween(0, 19);
      if (!randIDs.includes(randID)) {
        randIDs.push(randID);
      }
    }

    randIDs = randIDs
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    let randomizedWordList;

    if (data) {
      randomizedWordList = randIDs.map((id) => data[id]);
      setCurrWord(data[answerID]);
    } else if (words) {
      randomizedWordList = randIDs.map((id) => words[id]);
      setCurrWord(words[answerID]);
    }

    if (!randomizedWordList) return;

    setAsnwerOptions(randomizedWordList);
  };

  const showResults = () => {
    onGameEnd(answers);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1.4rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {data ? (
        <>
          <CountDown onCountZero={showResults} />
          <Box sx={{ display: 'flex', columnGap: '0.5rem', position: 'absolute', top: '2.6rem' }}>
            <FavoriteIcon
              sx={{
                fill: `${currHP > 0 ? 'rgba(250,211,207,1)' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 1 ? 'rgba(250,211,207,1)' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 2 ? 'rgba(250,211,207,1)' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 3 ? 'rgba(250,211,207,1)' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
            <FavoriteIcon
              sx={{
                fill: `${currHP > 4 ? 'rgba(250,211,207,1)' : '#C6B4CE'}`,
                fontSize: '1.6rem',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box
            sx={{
              color: 'rgba(250,211,207, 1)',
              textTransform: 'uppercase',
              fontSize: '1.4rem',
              fontWeight: '600',
            }}
          >
            Слово <span style={{ color: '#C6B4CE' }}>- {currWord?.word}</span>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '1rem', flexWrap: 'wrap' }}>
            {asnwerOptions.map((word) => (
              <ButtonCustom key={word?.id} onClick={handleAnswer}>
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
            Готовим слова
          </Typography>
          <CircularProgress sx={{ color: '#C6B4CE', marginTop: '0.5rem' }} />
        </Box>
      )}
    </Box>
  );
};

export { Game };
