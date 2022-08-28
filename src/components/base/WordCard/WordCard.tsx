import React, { useRef, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContextProvider';

import {
  Card,
  CardMedia,
  Typography,
  Box,
  CardContent,
  IconButton,
  Container,
  Button,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { WordDTO, UserAggregatedWord } from '../../../api/apiCalls.types';
import { API_URL } from '../../../api/apiUrl';
import { createUserWord, updateUserWord, deleteUserWord } from '../../../api/apiCalls';

const WordCard: React.FC<WordDTO | UserAggregatedWord> = ({
  // @ts-expect-error
  _id,
  // @ts-expect-error
  id,
  word,
  image,
  textMeaning,
  textMeaningTranslate,
  textExample,
  textExampleTranslate,
  transcription,
  audio,
  audioMeaning,
  audioExample,
  wordTranslate,
  // @ts-expect-error
  userWord,
}) => {
  const { auth } = useAuthContext();
  const [difficulty, setDifficulty] = useState(userWord?.difficulty);
  console.log(difficulty);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioList = [audio, audioMeaning, audioExample];
  let audioPointer = 0;
  let isAudioPlaying = false;

  const handleDifficulty = (newDifficulty: 'hard' | 'easy') => {
    if (auth) {
      if (difficulty) {
        if (difficulty === newDifficulty) {
          deleteUserWord(auth?.userId, id || _id);
          setDifficulty(undefined);
        } else {
          updateUserWord(auth?.userId, id || _id, {
            difficulty: newDifficulty,
          });
          setDifficulty(newDifficulty);
        }
      } else {
        createUserWord(auth?.userId, id || _id, {
          difficulty: newDifficulty,
        });
        setDifficulty(newDifficulty);
      }
    }
  };

  let cardBorderColor = 'gray';
  if (difficulty) {
    cardBorderColor = difficulty === 'hard' ? 'red' : 'green';
  }

  const playAudio = () => {
    if (audioRef.current) {
      isAudioPlaying = true;
      if (audioPointer < 3) {
        audioRef.current.src = `${API_URL}/${audioList[audioPointer]}`;
        audioRef.current.play();
        audioPointer += 1;
        audioRef.current?.addEventListener(
          'ended',
          () => {
            playAudio();
          },
          { once: true }
        );
      } else {
        audioPointer = 0;
        isAudioPlaying = false;
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioPointer = 0;
      isAudioPlaying = false;
    }
  };

  return (
    <Container>
      <Card
        variant="outlined"
        sx={{ marginBottom: '30px', display: { sm: 'flex' }, borderColor: cardBorderColor }}
      >
        <CardMedia
          sx={{ width: { sm: 200 }, minHeight: 150 }}
          component="img"
          image={`${API_URL}/${image}`}
          alt={word}
        />
        <CardContent sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginBottom: -1,
                }}
              >
                <Typography variant="h5" component="span">
                  {word}
                </Typography>
                <IconButton
                  sx={{ width: 32, height: 32 }}
                  onClick={() => {
                    isAudioPlaying ? stopAudio() : playAudio();
                  }}
                >
                  <VolumeUpIcon />
                </IconButton>
                <Typography component="span" variant="body1" sx={{ color: 'text.secondary' }}>
                  {transcription}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" component="span">
                  {wordTranslate}
                </Typography>
              </Box>
            </Box>
            {auth && (
              <Box>
                <Button
                  variant={difficulty === 'easy' ? 'outlined' : 'contained'}
                  color="success"
                  size="small"
                  onClick={() => {
                    handleDifficulty('easy');
                  }}
                >
                  Знаю
                </Button>
                <Button
                  variant={difficulty === 'hard' ? 'outlined' : 'contained'}
                  // variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    handleDifficulty('hard');
                  }}
                >
                  Сложна
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ marginBottom: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {textMeaning.split(/<\/?i>/).map((value, index) => {
                return (
                  <Box component="span" key={index} sx={index === 1 ? { fontStyle: 'italic' } : {}}>
                    {value}
                  </Box>
                );
              })}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {textMeaningTranslate}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {textExample.split(/<\/?b>/).map((value, index) => {
                return (
                  <Box component="span" key={index} sx={index === 1 ? { fontWeight: 'bold' } : {}}>
                    {value}
                  </Box>
                );
              })}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {textExampleTranslate}
            </Typography>
          </Box>
        </CardContent>
        <audio ref={audioRef} src={`${API_URL}/${audioList[audioPointer]}`} />
      </Card>
    </Container>
  );
};

export { WordCard };
