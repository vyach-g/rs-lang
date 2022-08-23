import React, { useEffect, useState } from 'react';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { WordDTO } from '../../../api/apiCalls.types';
import generateId, { randomInBetween } from '../../../utils/randomIdGenerator';
import { getWordById } from '../../../api/apiCalls';

interface IViewport {
  newDifficulty: string;
  onGameEnd: () => void;
}

const Viewport = ({ newDifficulty, onGameEnd }: IViewport) => {
  const difficulty = newDifficulty;
  const [currHP, setCurrHP] = useState(5);
  const [currWord, setCurrWord] = useState<WordDTO>();
  const [data, setData] = useState<WordDTO[] | null>(null);

  useEffect(() => {
    setUpWords();
  }, []);

  const handleAnswer = (event: React.MouseEvent) => {
    let newHP;
    event.preventDefault();
    (event.currentTarget as HTMLButtonElement).disabled = true;

    if (currWord?.wordTranslate !== (event.target as HTMLButtonElement).textContent) {
      newHP = currHP - 1;
      setCurrHP(newHP);
    }

    if (newHP === 0) {
      onGameEnd();
      return;
    }

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
      } catch (e) {
        onGameEnd();
        return;
      }
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
        rowGap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {data ? (
        <>
          <Box>{currHP}</Box>
          <Box sx={{ textTransform: 'uppercase' }}>{currWord?.word}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: '1rem' }}>
            {data.map((word) => (
              <Button key={word.word} onClick={handleAnswer}>
                {word.wordTranslate}
              </Button>
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
          <Typography variant="h4" sx={{ color: '#9C9C9C' }}>
            Готовим Кофе...
          </Typography>
          <CircularProgress sx={{ color: '#9C9C9C' }} />
        </Box>
      )}
    </Box>
  );
};

export { Viewport };
