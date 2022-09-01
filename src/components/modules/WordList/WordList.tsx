import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAuthContext } from '../../../context/AuthContextProvider';
import storage from '../../../storage/storage';
import { getWords, getUserAggregatedWords } from '../../../api/apiCalls';
import { UserAggregatedWord, UserAggregatedWords } from '../../../api/apiCalls.types';
import {
  GROUP_COLORS,
  PAGE_PER_GROUP,
  TextbookTab,
  WORDS_TOTAL,
  WORD_PER_PAGE,
} from './wordListConsts';

import { WordCard } from '../../base';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardMedia,
} from '@mui/material';

type WordListProps = {
  group: number;
  setGroup: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const WordList: React.FC<WordListProps> = (props) => {
  const { auth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [wordList, setWordList] = useState<UserAggregatedWord[]>([]);
  const [learnedPages, setLearnedPages] = useState(new Array(PAGE_PER_GROUP));

  const { group, setGroup, page, setPage } = props;

  useEffect(() => {
    setIsLoading(true);
    if (!auth) {
      getWords(group, page)
        .then((response) => {
          const words = response.data.map((word) => {
            const formattedWords = Object.assign(word);
            formattedWords._id = formattedWords.id;
            formattedWords.userWord = null;
            return formattedWords;
          });
          setWordList(words);
          setIsLoading(false);
        })
        .then(() => {
          storage.setItem('textbookGroup', group);
          storage.setItem('textbookPage', page);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (group !== TextbookTab.Hard) {
        getUserAggregatedWords(auth.userId, group, page, WORD_PER_PAGE)
          .then((res) => {
            const words = res.data[0].paginatedResults;
            const learned = words.map((word) => !!word?.userWord?.difficulty);
            setWordList(words);
            setIsLoading(false);
          })
          .then(() => {
            storage.setItem('textbookGroup', group);
            storage.setItem('textbookPage', page);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        getUserAggregatedWords(
          auth.userId,
          undefined,
          undefined,
          WORDS_TOTAL,
          JSON.stringify({ 'userWord.difficulty': 'hard' })
        )
          .then((res) => {
            const words = res.data[0].paginatedResults;
            setWordList(words);
            storage.setItem('textbookGroup', group);
            setIsLoading(false);
          })
          .then(() => {
            storage.setItem('textbookGroup', group);
            storage.setItem('textbookPage', page);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [group, page]);

  const removeFromHard = (num: number) => {
    const newHardWordList = [...wordList.slice(0, num), ...wordList.slice(num + 1)];
    setWordList(newHardWordList);
  };

  useEffect(() => {
    if (auth && page !== TextbookTab.Hard) {
      const pagesPromises: Promise<AxiosResponse<UserAggregatedWords>>[] = [];
      for (let i = 0; i < PAGE_PER_GROUP; i++) {
        pagesPromises.push(getUserAggregatedWords(auth.userId, group, i, WORD_PER_PAGE));
      }
      Promise.all(pagesPromises).then((promises) => {
        const learned = promises.map((promise) => {
          const words = promise.data[0].paginatedResults;
          return words.reduce((prev, curr) => {
            return prev && !!curr?.userWord?.difficulty;
          }, true);
        });
        setLearnedPages(learned);
      });
    }
  }, [group, page]);

  return (
    <Container sx={{ py: 2 }}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Typography variant="h4" align="center" gutterBottom={true}>
          Учебник
        </Typography>
        <Typography variant="h6">Выберите группу и страницу учебника</Typography>

        <Box
          sx={{
            width: '100%',
            maxWidth: '850px',
            overflowX: { xs: 'scroll', md: 'hidden' },
          }}
        >
          <Box sx={{ width: '850px', py: 1, display: 'flex', justifyContent: 'space-between' }}>
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Сложные слова'].map((value, index) => {
              return (
                <Box
                  component="div"
                  key={index}
                  sx={{
                    width: '100%',
                    px: '4px',
                    height: '56px',
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{
                      height: '52px',
                      width: '100%',
                      display: 'flex',
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '5px',
                      transition: 'all 0.3s',
                      cursor: isLoading ? 'inherit' : 'pointer',
                      boxSizing: 'border-box',
                      backgroundColor: isLoading ? '#E3E3E3' : GROUP_COLORS[index].light,
                      border: index === group ? '5px solid rgba(255, 255, 255, .5)' : '',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      '&:hover': {
                        transform: 'translate(0px, -5px)',
                      },
                    }}
                    onClick={() => {
                      if (group !== index) {
                        setIsLoading(true);
                        setLearnedPages([]);
                        setWordList([]);
                        setGroup(index);
                        setPage(1);
                      }
                    }}
                  >
                    {value}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        {group !== TextbookTab.Hard && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '850px',
              overflowX: { xs: 'scroll', md: 'hidden' },
              mb: 2,
            }}
          >
            <Box sx={{ width: '850px', py: 1 }}>
              {Array(30)
                .fill('')
                .map((elem, index) => {
                  return (
                    <Box
                      component="span"
                      key={index}
                      sx={{
                        width: '56.5px',
                        height: '56px',
                        display: 'inline-flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          height: '52px',
                          width: '52px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '5px',
                          transition: 'all 0.3s',
                          cursor: isLoading ? 'inherit' : 'pointer',
                          boxSizing: 'border-box',
                          backgroundColor: isLoading
                            ? '#E3E3E3'
                            : learnedPages[index]
                            ? GROUP_COLORS[group].dark
                            : GROUP_COLORS[group].light,
                          border: index === page ? '5px solid rgba(255, 255, 255, .5)' : '',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          '&:hover': {
                            transform: 'translate(0px, -5px)',
                          },
                        }}
                        onClick={() => {
                          if (page !== index && !isLoading) {
                            setIsLoading(true);
                            setWordList([]);
                            setPage(index);
                          }
                        }}
                      >
                        {index + 1}
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        )}
        {
          <>
            {wordList.map((word, index) => {
              return (
                <WordCard
                  removeFromHard={removeFromHard}
                  isHardGroup={group === TextbookTab.Hard}
                  index={index}
                  key={word._id}
                  {...word}
                ></WordCard>
              );
            })}
          </>
        }
        {
          isLoading &&
            Array(20)
              .fill('')
              .map((elem, index) => {
                return (
                  <Container key={index} maxWidth="md">
                    <Card
                      sx={{
                        display: { sm: 'flex' },
                        height: { xs: '510px', sm: '186px' },
                        backgroundColor: '#F3F3F3',
                        borderRadius: 3,
                        marginBottom: '30px',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                      }}
                    >
                      <CardMedia
                        sx={{ width: { sm: 200 }, minHeight: 186, backgroundColor: '#E3E3E3' }}
                        component="span"
                      />
                    </Card>
                  </Container>
                );
              })

        }
        {auth && !isLoading && group === TextbookTab.Hard && wordList.length === 0 && (
          <>
            <Typography variant="h4" align="center" gutterBottom={true}>
              Отличная работа!
            </Typography>
            <Typography variant="h5" align="center" gutterBottom={true}>
              Все сложные слова выучены
            </Typography>
          </>
        )}
      </Grid>
    </Container>
  );
};

export { WordList };
