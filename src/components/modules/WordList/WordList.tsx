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
  Pagination,
  Typography,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
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
  const [learnedWords, setLearnedWords] = useState(new Array(WORD_PER_PAGE));

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
            setLearnedWords(learned);
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
        <Container sx={{ display: 'flex' }}>
          <Tabs
            sx={{ mb: 2, mx: 'auto', width: '850px', gap: '10px' }}
            variant="fullWidth"
            value={group}
            onChange={(event: React.SyntheticEvent, value: number) => {
              if (group !== value) {
                setIsLoading(true);
                setLearnedPages([]);
                setWordList([]);
                setGroup(value);
                setPage(1);
              }
            }}
          >
            <Tab
              disabled={isLoading ? true : false}
              label="A1"
              value={TextbookTab.A1}
              sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.A1].light }}
            />
            <Tab
              disabled={isLoading ? true : false}
              label="A2"
              value={TextbookTab.A2}
              sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.A2].light }}
            />
            <Tab
              disabled={isLoading ? true : false}
              label="B1"
              value={TextbookTab.B1}
              sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.B1].light }}
            />
            <Tab
              disabled={isLoading ? true : false}
              label="B2"
              value={TextbookTab.B2}
              sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.B2].light }}
            />
            <Tab
              disabled={isLoading ? true : false}
              label="C1"
              value={TextbookTab.C1}
              sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.C1].light }}
            />
            <Tab
              disabled={isLoading ? true : false}
              label="C2"
              value={TextbookTab.C2}
              sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.C2].light }}
            />
            {auth && (
              <Tab
                disabled={isLoading ? true : false}
                label="Сложные слова"
                value={TextbookTab.Hard}
                sx={{ borderRadius: 3, backgroundColor: GROUP_COLORS[TextbookTab.Hard].light }}
              />
            )}
          </Tabs>
        </Container>
        {/* {group !== TextbookTab.Hard && (
          <Pagination
            disabled={isLoading ? true : false}
            count={PAGE_PER_GROUP}
            page={page}
            onChange={(event, num) => {
              setWordList([]);
              setPage(num);
            }}
            siblingCount={1}
            color="primary"
            sx={{ mb: 2 }}
          />
        )} */}
        {/* <Tabs
          value={page}
          sx={{ mb: 2 }}
          variant="scrollable"
          onChange={(event, num) => {

          }}
        >
          {Array(30)
            .fill('')
            .map((elem, index) => {
              return (
                <Tab
                  value={index}
                  label={index + 1}
                  key={index}
                  sx={{
                    width: '20px',
                    minWidth: '20px',
                    backgroundColor: GROUP_COLORS[group].light,
                  }}
                ></Tab>
              );
            })}
        </Tabs> */}

        {group !== TextbookTab.Hard && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '850px',
              overflowX: { xs: 'scroll', md: 'hidden' },
              // overflowX: 'hidden',

              mb: 2,
            }}
          >
            <Box sx={{ width: '850px' }}>
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

                        // minWidth: '20px',
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
                            : index === page
                            ? GROUP_COLORS[group].dark
                            : GROUP_COLORS[group].light,
                          border:
                            learnedPages[index] || index === page
                              ? '4px solid rgba(0, 0, 0, .5)'
                              : '',
                          fontWeight: 'bold',
                          color: index === page ? '#ffffff' : '#000000',
                          '&:hover': {
                            backgroundColor: isLoading ? 'E3E3E3' : '#ffffff',
                            color: '#000000',
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
        {/* {auth &&
          learnedWords.reduce((prev, curr) => prev && !!curr, true) &&
          group === TextbookTab.Hard &&
          !isLoading && (
            <Typography variant="h5" align="center">
              На данной странице изучены все слова
            </Typography>
          )} */}
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
                        // width: '852px',
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

          // <CircularProgress color="primary" />
        }
      </Grid>
    </Container>
  );
};

export { WordList };
