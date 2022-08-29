import React, { useRef, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { createUserWord, updateUserWord, deleteUserWord } from '../../../api/apiCalls';
import { UserAggregatedWord } from '../../../api/apiCalls.types';
import { API_URL } from '../../../api/apiUrl';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  CardContent,
  IconButton,
  Container,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { green, grey, red } from '@mui/material/colors';

const WordCard: React.FC<UserAggregatedWord> = ({
  _id,
  word,
  group,
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
  userWord,
}) => {
  const { auth } = useAuthContext();
  const [difficulty, setDifficulty] = useState(userWord?.difficulty);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioList = [audio, audioMeaning, audioExample];
  let audioPointer = 0;
  let isAudioPlaying = false;

  const handleDifficulty = (newDifficulty: 'hard' | 'easy') => {
    if (auth) {
      if (difficulty) {
        if (difficulty === newDifficulty) {
          deleteUserWord(auth?.userId, _id);
          setDifficulty(undefined);
        } else {
          updateUserWord(auth?.userId, _id, {
            difficulty: newDifficulty,
          });
          setDifficulty(newDifficulty);
        }
      } else {
        createUserWord(auth?.userId, _id, {
          difficulty: newDifficulty,
        });
        setDifficulty(newDifficulty);
      }
    }
  };

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
    <Container maxWidth="md">
      <Card
        variant="outlined"
        sx={{
          marginBottom: '30px',
          display: { sm: 'flex' },
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          borderRadius: 3,
          borderRight: `12px solid ${
            difficulty ? (difficulty === 'hard' ? red[400] : green[400]) : grey[300]
          }`,
          transition: 'all 0.3s',
        }}
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
                <IconButton
                  sx={{
                    width: 32,
                    height: 32,
                    color: difficulty === 'easy' ? green[100] : green[400],
                  }}
                  onClick={() => {
                    handleDifficulty('easy');
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  sx={{ width: 32, height: 32, color: difficulty === 'hard' ? red[100] : red[400] }}
                  onClick={() => {
                    handleDifficulty('hard');
                  }}
                >
                  <DoDisturbOnIcon />
                </IconButton>
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
