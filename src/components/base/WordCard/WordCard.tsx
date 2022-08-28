import React, { useRef } from 'react';
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
import { WordDTO } from '../../../api/apiCalls.types';
import { API_URL } from '../../../api/apiUrl';

const WordCard: React.FC<WordDTO> = ({
  word,
  image,
  textMeaning,
  textExample,
  transcription,
  audio,
  audioMeaning,
  audioExample,
}) => {
  const { auth } = useAuthContext();
  // const player = new Audio(`https://rslang-project1.herokuapp.com/${audio}`);
  // const playAllAudio = () => {
  console.log('audio', audio);

  // };
  // player.play();
  // audioPlayer.current?.src = `https://rslang-project1.herokuapp.com/${audio}`;
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioList = [audio, audioMeaning, audioExample];
  let audioPointer = 0;
  let isAudioPlaying = false;

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
      <Card variant="outlined" sx={{ marginBottom: '30px', display: { sm: 'flex' } }}>
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
            <Box
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Typography variant="h5" component="span">
                {word}
              </Typography>
              <IconButton
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
            {!auth && (
              <Box>
                <Button variant="contained" size="small">
                  Знаю
                </Button>
                <Button variant="contained" color="error" size="small">
                  Сложна
                </Button>
              </Box>
            )}
          </Box>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {textMeaning.split(/<\/?i>/).map((value, id) => {
              return (
                <Box component="span" key={id} sx={id === 1 ? { fontStyle: 'italic' } : {}}>
                  {value}
                </Box>
              );
            })}
          </Typography>

          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {textExample.split(/<\/?b>/).map((value, id) => {
              return (
                <Box component="span" key={id} sx={id === 1 ? { fontWeight: 'bold' } : {}}>
                  {value}
                </Box>
              );
            })}
          </Typography>
        </CardContent>
        <audio ref={audioRef} src={`${API_URL}/${audioList[audioPointer]}`} />
      </Card>
    </Container>
  );
};

export { WordCard };
