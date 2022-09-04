import React, { useRef, useState } from 'react';
import { useAuthContext } from '../../../../context/AuthContextProvider';
import { addWordStat } from '../../../../api/apiCalls';
import { API_URL } from '../../../../api/apiUrl';
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
import { GROUP_COLORS, WordCardData } from '../wordListConsts';
import { GameStat } from './GameStat';

type WordCardProps = {
  word: WordCardData;
  numberInList: number;
  isHardGroup: boolean;
  removeFromHard: (num: number) => void;
  markWordAsLearned: (listId: number, result: 'easy' | 'hard') => void;
};

const WordCard: React.FC<WordCardProps> = ({
  word,
  numberInList,
  removeFromHard,
  isHardGroup,
  markWordAsLearned,
}) => {
  const { auth } = useAuthContext();
  const [difficulty, setDifficulty] = useState(word?.userWord?.difficulty);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioList = [word.audio, word.audioMeaning, word.audioExample];

  let audioPointer = 0;
  const [isPlaying, setIsPlaying] = useState(false);

  const wordStat = {
    textbook: { right: 0, wrong: 0 },
    sprint: { right: 0, wrong: 0 },
    audiocall: { right: 0, wrong: 0 },
    savannah: { right: 0, wrong: 0 },
  };
  if (word?.userWord?.optional) {
    const stats = word.userWord.optional;
    for (let key in stats) {
      const game = stats[key].game;
      if (stats[key].learned === true) {
        wordStat[game].right += 1;
      } else if (stats[key].learned === false) {
        wordStat[game].wrong += 1;
      }
    }
  }

  const handleDifficulty = (newDifficulty: 'hard' | 'easy') => {
    const isCorrect = newDifficulty === 'easy';
    if (auth) {
      if (difficulty !== newDifficulty) {
        markWordAsLearned(word.listId, newDifficulty);
        addWordStat(word, isCorrect, 'textbook');
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
          sx={{
            width: { sm: 200 },
            height: { sm: 200 },
            minHeight: 150,
            p: 1,
            borderRadius: '15px',
          }}
          component="img"
          width="200px"
          image={`${API_URL}/${word.image}`}
          alt={word.word}
        />
        <CardContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
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
                    onClick={() => (isPlaying ? stopAudio() : playAudio())}
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

            <Box sx={{ marginBottom: 1 }}>
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
          </Box>

          {auth && (
            <Box
              sx={{
                width: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: '0',
              }}
            >
              <Box>
                <IconButton
                  sx={{
                    width: 32,
                    height: 32,
                    color: difficulty === 'easy' ? green[100] : green[500],
                  }}
                  onClick={() => handleDifficulty('easy')}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  sx={{
                    width: 32,
                    height: 32,
                    color: difficulty === 'hard' ? red[100] : red[500],
                  }}
                  onClick={() => handleDifficulty('hard')}
                >
                  <DoDisturbOnIcon />
                </IconButton>
              </Box>
              {word.userWord && (
                <Box>
                  {(
                    ['sprint', 'audiocall', 'savannah'] as Array<
                      'sprint' | 'audiocall' | 'savannah'
                    >
                  ).map((game, index) => {
                    let gameName: string;
                    switch (game) {
                      case 'sprint':
                        gameName = 'Спринт';
                        break;
                      case 'audiocall':
                        gameName = 'Аудиовызов';
                        break;
                      case 'savannah':
                        gameName = 'Саванна';
                        break;
                    }
                    return (
                      !!(wordStat[game].right + wordStat[game].wrong) && (
                        <GameStat
                          key={index}
                          gameName={gameName}
                          right={wordStat[game].right}
                          wrong={wordStat[game].wrong}
                        />
                      )
                    );
                  })}
                </Box>
              )}
            </Box>
          )}
        </CardContent>
        <audio ref={audioRef} src={`${API_URL}/${audioList[audioPointer]}`} />
      </Card>
    </Container>
  );
};

export { WordCard };
