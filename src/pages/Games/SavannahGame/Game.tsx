import React, { useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import generateId, { randomInBetween } from '../../../utils/randomIdGenerator';
import { getWordById } from '../../../api/apiCalls';

import { styled } from '@mui/material/styles';

import { IAnswer } from './types';
import { WordDTO } from '../../../api/apiCalls.types';
import { CountDown } from '../../../components/base';

const ButtonCustom = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  fontWeight: '600',
  borderRadius: '3px',
  borderWidth: '2px',
  borderColor: 'black',
  color: 'black',
  padding: '.3rem 3rem',
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

  useEffect(() => {
    setUpWords();
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
      onGameEnd(answers);
      return;
    }

    setAnswers([...answers, answer]);

    setUpWords();
  };

  const setUpWords = async () => {
    const randID = randomInBetween(0, 3);
    const words = [];
    let nextWord;

    for (let i = 0; i < 4; i++) {
      try {
        nextWord = await getWord();
        words.push(nextWord);
      } catch {
        onError();
        return;
      }
    }

    if (words.length === 5) {
      setUpWords();
      return;
    }

    setData(words);
    setCurrWord(words[randID]);
  };

  const getWord = async () => {
    const randId = generateId(difficulty);
    return getWordById(randId).then((responce) => responce.data);
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
          <CountDown triggerReset={currWord} onCountZero={setUpWords} />
          <Box sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Жизни - {currHP}</Box>
          <Box sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Слово - {currWord?.word}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '1rem', flexWrap: 'wrap' }}>
            {data.map((word) => (
              <ButtonCustom variant="outlined" key={word.word} onClick={handleAnswer}>
                {word.wordTranslate}
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
          <Typography variant="h5" sx={{ color: '#9C9C9C' }}>
            Готовим слова
          </Typography>
          <CircularProgress sx={{ color: '#9C9C9C' }} />
        </Box>
      )}
    </Box>
  );
};

export { Game };
