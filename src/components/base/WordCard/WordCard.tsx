import React, { useRef, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContextProvider';
import { createUserWord, updateUserWord, deleteUserWord, addWordStat } from '../../../api/apiCalls';
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
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { green, grey, red } from '@mui/material/colors';
import { GROUP_COLORS } from '../../modules/WordList/wordListConsts';

type WordCardProps = {
  word: UserAggregatedWord;
  numberInList: number;
  isHardGroup: boolean;
  removeFromHard: (num: number) => void;
};

const WordCard: React.FC<WordCardProps> = ({ word, numberInList, removeFromHard, isHardGroup }) => {
  console.log(word);
  const { auth } = useAuthContext();
  const [difficulty, setDifficulty] = useState(word.userWord?.difficulty);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioList = [word.audio, word.audioMeaning, word.audioExample];

  let audioPointer = 0;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDifficulty = (newDifficulty: 'hard' | 'easy') => {
    const isCorrect = newDifficulty === 'easy';
    const adaptedWord = Object.assign(word, { id: word._id });

    if (auth) {
      if (difficulty !== newDifficulty) {
        addWordStat(adaptedWord, isCorrect, 'textbook');
        setDifficulty(newDifficulty);
        if (newDifficulty === 'easy' && isHardGroup) {
          removeFromHard(numberInList);
        }
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      setIsPlaying(true);
      if (audioPointer < 3) {
        audioRef.current.src = `${API_URL}/${audioList[audioPointer]}`;
        audioRef.current.play();
        audioPointer += 1;
        audioRef.current.onended = () => {
          playAudio();
        };
      } else {
        audioPointer = 0;
        setIsPlaying(false);
      }
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioPointer = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Card
        sx={{
          marginBottom: '30px',
          display: { sm: 'flex' },
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          borderRadius: 3,
          borderRight: `12px solid ${
            difficulty ? (difficulty === 'hard' ? red[500] : green[500]) : grey[300]
          }`,
          transition: 'all 0.3s',
        }}
      >
        <CardMedia
          sx={{ width: { sm: 200 }, minHeight: 150, p: 1, borderRadius: '15px' }}
          component="img"
          image={`${API_URL}/${word.image}`}
          alt={word.word}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  backgroundColor: GROUP_COLORS[word.group].dark,
                  width: '3px',
                  height: '40px',
                  display: 'inline-block',
                }}
              ></Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  pl: 2,
                }}
              >
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
                    {word.word}
                  </Typography>

                  <IconButton
                    sx={{ width: 32, height: 32 }}
                    onClick={() => {
                      isPlaying ? stopAudio() : playAudio();
                    }}
                  >
                    {isPlaying ? <StopIcon /> : <VolumeUpIcon />}
                  </IconButton>

                  <Typography component="span" variant="body1" sx={{ color: 'text.secondary' }}>
                    {word.transcription}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" component="span">
                    {word.wordTranslate}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {auth && (
              <Box>
                <IconButton
                  sx={{
                    width: 32,
                    height: 32,
                    color: difficulty === 'easy' ? green[100] : green[500],
                  }}
                  onClick={() => {
                    handleDifficulty('easy');
                  }}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  sx={{ width: 32, height: 32, color: difficulty === 'hard' ? red[100] : red[500] }}
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
              {word.textMeaning.split(/<\/?i>/).map((value, index) => {
                return (
                  <Box
                    component="span"
                    key={index}
                    sx={
                      index === 1
                        ? { fontStyle: 'italic', backgroundColor: GROUP_COLORS[word.group].light }
                        : {}
                    }
                  >
                    {value}
                  </Box>
                );
              })}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {word.textMeaningTranslate}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {word.textExample.split(/<\/?b>/).map((value, index) => {
                return (
                  <Box
                    component="span"
                    key={index}
                    sx={
                      index === 1
                        ? { fontWeight: 'bold', backgroundColor: GROUP_COLORS[word.group].light }
                        : {}
                    }
                  >
                    {value}
                  </Box>
                );
              })}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {word.textExampleTranslate}
            </Typography>
          </Box>
        </CardContent>
        <audio ref={audioRef} src={`${API_URL}/${audioList[audioPointer]}`} />
      </Card>
    </Container>
  );
};

export { WordCard };
