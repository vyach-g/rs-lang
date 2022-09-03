import React, { useEffect, useRef, useState } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

import { randomInBetween } from '../../../utils/randomIdGenerator';
import { addWordStat, getWords } from '../../../api/apiCalls';

import { styled } from '@mui/material/styles';

import { IAnswer } from './types';
import { withAsync } from '../../../api/helpers/withAsync';
import { WordDTO } from '../../../api/apiCalls.types';
import { API_URL } from '../../../api/apiUrl';
import { useLocation } from 'react-router-dom';
import { ShowcaseProps } from '../../../components/modules/Showcase/Showcase';

import shuffleArray from '../../../utils/shuffleArray';
import { cursorTo } from 'readline';

const ButtonCustom = styled('button')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgb(255, 222, 222)',
  fontWeight: '600',
  fontSize: '1rem',
  letterSpacing: '0.05rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
  padding: '0 0 0.6rem 0',
  transition: '0.3s ease',
  maxWidth: '100rem',
  '&:hover': {
    borderColor: 'rgb(255, 222, 222)',
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    width: '0.8rem',
    height: '3px',
    background: '#d5c3d6',
    transition: 'width .25s',
  },
  '&:hover::after': {
    width: '100%',
    background: 'rgb(255, 222, 222)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '0 0 0.4rem 0',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

const ButtonInfo = styled('button')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgb(255, 222, 222)',
  fontWeight: '600',
  fontSize: '1rem',
  letterSpacing: '0.05rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
  padding: '0 0 0.6rem 0',
  transition: '0.3s ease',
  maxWidth: '100rem',
  '&:hover': {
    borderColor: 'rgb(255, 222, 222)',
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    height: '3px',
    background: '#d5c3d6',
    transition: 'width .25s',
  },
  '&:hover::after': {
    background: 'rgb(255, 222, 222)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '0 0 0.4rem 0',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

const ButtonWord = styled('button')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: '0.5rem',
  background: 'none',
  border: 'none',
  color: 'rgb(255, 222, 222)',
  textTransform: 'uppercase',
  fontWeight: '600',
  cursor: 'pointer',
  '& svg': {
    transition: '0.25s ease',
  },
  '&:hover svg': {
    fill: 'rgba(250,211,207, 1)',
  },
});

const WordImage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '300px',
  height: '100%',
  maxHeight: '200px',
  cursor: 'pointer',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '2rem 0 2rem 0',
    boxShadow: '0 0 5px black',
    transition: '0.25s ease',
    ':hover': {
      boxShadow: '0 0 8px black',
    },
  },
});

interface Props {
  newDifficulty: number;
  onGameEnd: (arg: IAnswer[], longestSeries: number) => void;
}

const Game: React.FC<Props> = ({ newDifficulty, onGameEnd }) => {
  const difficulty = newDifficulty;
  const [data, setData] = useState<WordDTO[] | null>(null);

  const [answer, setAnswer] = useState<WordDTO>();
  const [answerID, setAnswerID] = useState<number>(0);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [asnwerOptions, setAsnwerOptions] = useState<(WordDTO | undefined)[]>([]);

  const [currSeries, setCurrSeries] = useState(0);
  const [longestSeries, setLongestSeries] = useState(0);

  const { state } = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setupData();
  }, []);

  const handleGameProcess = (event: React.MouseEvent) => {
    if (!answer) return;

    const buttonEl = event.currentTarget as HTMLButtonElement;
    const isCorrect = answer?.wordTranslate === buttonEl.textContent;

    if (isCorrect) {
      setCurrSeries(currSeries + 1);
    } else if (buttonEl.textContent === 'Продолжить') {
      setCurrSeries(0);
      setAnswerRevealed(!answerRevealed);

      if (currSeries > longestSeries) {
        setLongestSeries(currSeries);
      }
    } else {
      setAnswerRevealed(true);
      return;
    }

    addWordStat(answer, isCorrect, 'audiocall');

    const userAnswer = {
      word: answer,
      isCorrect: isCorrect,
    };

    if (answerID === 4) {
      const updatedSeries = isCorrect ? currSeries + 1 : currSeries;
      onGameEnd(
        [...answers, userAnswer],
        updatedSeries > longestSeries ? updatedSeries : longestSeries
      );
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

  const handleAudio = () => {
    audioRef.current?.play();
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
          {answerRevealed ? (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  rowGap: '1.4rem',
                  paddingInline: '0',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'rgb(160, 217, 149)',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  Верный ответ
                </Typography>
                <WordImage>
                  <img src={`${API_URL}/${answer?.image}`} />
                </WordImage>
                <ButtonWord onClick={handleAudio}>
                  <svg
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 122.88 91.69"
                    width={50}
                    height={50}
                    fill="#d5c3d6"
                  >
                    <g>
                      <path d="M49.58,0h11.34v3.79c28.37,6.5,31.61,20.12,15.16,41.59c1.75-21.3-0.4-25.87-15.16-26.86v53.86 c0.03,0.29,0.04,0.57,0.04,0.86c0,7-7.35,13.94-16.4,15.51c-9.06,1.57-16.4-2.84-16.4-9.84c0-9.55,13.12-17.84,21.43-14.92L49.58,0 L49.58,0L49.58,0z M72.31,91.69h-0.16c0-1.29-0.48-2.41-1.44-3.38c-0.96-0.96-2.09-1.44-3.38-1.44v-0.16 c1.29,0,2.41-0.48,3.38-1.44c0.96-0.97,1.44-2.09,1.44-3.37h0.16c0,1.29,0.48,2.41,1.44,3.37c0.96,0.96,2.09,1.44,3.38,1.44v0.16 c-1.29,0-2.41,0.48-3.38,1.44C72.79,89.27,72.31,90.4,72.31,91.69L72.31,91.69L72.31,91.69z M92.53,74.61l-0.4-0.03 c0.24-3.22-0.75-6.13-2.97-8.72s-4.94-4.01-8.17-4.25l0.03-0.4c3.22,0.25,6.13-0.75,8.72-2.97c2.59-2.23,4.01-4.95,4.25-8.16 l0.4,0.03c-0.24,3.22,0.75,6.13,2.97,8.72s4.94,4.01,8.17,4.25l-0.03,0.4c-3.22-0.25-6.13,0.75-8.72,2.97 C94.19,68.67,92.78,71.39,92.53,74.61L92.53,74.61L92.53,74.61z M109.33,42.87l-0.5,0.06c-0.52-4.13-2.51-7.55-5.99-10.26 c-3.47-2.71-7.28-3.8-11.42-3.29l-0.06-0.5c4.13-0.51,7.55-2.51,10.26-5.99s3.8-7.29,3.29-11.41l0.5-0.06 c0.52,4.13,2.51,7.55,5.99,10.26c3.48,2.71,7.28,3.8,11.42,3.29l0.06,0.5c-4.13,0.52-7.55,2.51-10.26,5.99 C109.91,34.93,108.82,38.74,109.33,42.87L109.33,42.87L109.33,42.87z M18.45,54.03c-2.3,0-4.17-1.87-4.17-4.17s1.87-4.17,4.17-4.17 h16.63c2.3,0,4.17,1.87,4.17,4.17s-1.87,4.17-4.17,4.17H18.45L18.45,54.03L18.45,54.03z M10.57,33.79c-2.3,0-4.17-1.87-4.17-4.17 c0-2.3,1.87-4.17,4.17-4.17h24.52c2.3,0,4.17,1.87,4.17,4.17c0,2.3-1.87,4.17-4.17,4.17H3.67L10.57,33.79L10.57,33.79z M4.17,13.55 C1.87,13.55,0,11.68,0,9.37c0-2.3,1.87-4.17,4.17-4.17h30.92c2.3,0,4.17,1.87,4.17,4.17c0,2.3-1.87,4.17-4.17,4.17L4.17,13.55 L4.17,13.55L4.17,13.55z" />
                    </g>
                  </svg>
                </ButtonWord>
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'rgb(255, 222, 222)',
                    textTransform: 'uppercase',
                  }}
                >
                  {answer?.word}
                  <span style={{ color: '#d5c3d6' }}> - {answer?.wordTranslate}</span>
                </Typography>
              </Box>
              <ButtonInfo onClick={handleGameProcess}>Продолжить</ButtonInfo>
            </>
          ) : (
            <>
              <ButtonWord onClick={handleAudio}>
                <svg
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 122.88 91.69"
                  width={64}
                  height={64}
                  fill="#d5c3d6"
                >
                  <g>
                    <path d="M49.58,0h11.34v3.79c28.37,6.5,31.61,20.12,15.16,41.59c1.75-21.3-0.4-25.87-15.16-26.86v53.86 c0.03,0.29,0.04,0.57,0.04,0.86c0,7-7.35,13.94-16.4,15.51c-9.06,1.57-16.4-2.84-16.4-9.84c0-9.55,13.12-17.84,21.43-14.92L49.58,0 L49.58,0L49.58,0z M72.31,91.69h-0.16c0-1.29-0.48-2.41-1.44-3.38c-0.96-0.96-2.09-1.44-3.38-1.44v-0.16 c1.29,0,2.41-0.48,3.38-1.44c0.96-0.97,1.44-2.09,1.44-3.37h0.16c0,1.29,0.48,2.41,1.44,3.37c0.96,0.96,2.09,1.44,3.38,1.44v0.16 c-1.29,0-2.41,0.48-3.38,1.44C72.79,89.27,72.31,90.4,72.31,91.69L72.31,91.69L72.31,91.69z M92.53,74.61l-0.4-0.03 c0.24-3.22-0.75-6.13-2.97-8.72s-4.94-4.01-8.17-4.25l0.03-0.4c3.22,0.25,6.13-0.75,8.72-2.97c2.59-2.23,4.01-4.95,4.25-8.16 l0.4,0.03c-0.24,3.22,0.75,6.13,2.97,8.72s4.94,4.01,8.17,4.25l-0.03,0.4c-3.22-0.25-6.13,0.75-8.72,2.97 C94.19,68.67,92.78,71.39,92.53,74.61L92.53,74.61L92.53,74.61z M109.33,42.87l-0.5,0.06c-0.52-4.13-2.51-7.55-5.99-10.26 c-3.47-2.71-7.28-3.8-11.42-3.29l-0.06-0.5c4.13-0.51,7.55-2.51,10.26-5.99s3.8-7.29,3.29-11.41l0.5-0.06 c0.52,4.13,2.51,7.55,5.99,10.26c3.48,2.71,7.28,3.8,11.42,3.29l0.06,0.5c-4.13,0.52-7.55,2.51-10.26,5.99 C109.91,34.93,108.82,38.74,109.33,42.87L109.33,42.87L109.33,42.87z M18.45,54.03c-2.3,0-4.17-1.87-4.17-4.17s1.87-4.17,4.17-4.17 h16.63c2.3,0,4.17,1.87,4.17,4.17s-1.87,4.17-4.17,4.17H18.45L18.45,54.03L18.45,54.03z M10.57,33.79c-2.3,0-4.17-1.87-4.17-4.17 c0-2.3,1.87-4.17,4.17-4.17h24.52c2.3,0,4.17,1.87,4.17,4.17c0,2.3-1.87,4.17-4.17,4.17H3.67L10.57,33.79L10.57,33.79z M4.17,13.55 C1.87,13.55,0,11.68,0,9.37c0-2.3,1.87-4.17,4.17-4.17h30.92c2.3,0,4.17,1.87,4.17,4.17c0,2.3-1.87,4.17-4.17,4.17L4.17,13.55 L4.17,13.55L4.17,13.55z" />
                  </g>
                </svg>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05rem',
                    textAlign: 'center',
                    lineHeight: '150%',
                  }}
                >
                  Нажми, чтобы
                  <br /> <span style={{ color: '#d5c3d6' }}>прослушать</span> слово
                </Typography>
              </ButtonWord>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.1rem',
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
              {/* Небезопасный код строчкой ниже */}
              <ButtonInfo onClick={handleGameProcess}>Узнать ответ</ButtonInfo>
            </>
          )}
          <audio
            ref={audioRef}
            src={`https://rslang-project1.herokuapp.com/${answer?.audio}`}
            autoPlay
          />
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
              color: '#d5c3d6',
              textTransform: 'uppercase',
              fontSize: '1.2rem',
              letterSpacing: '0.05rem',
              fontWeight: '600',
            }}
          >
            Готовим слова
          </Typography>
          <CircularProgress sx={{ color: '#d5c3d6', marginTop: '0.5rem' }} />
        </Box>
      )}
    </Box>
  );
};

export { Game };
