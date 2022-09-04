import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAuthContext } from '../../../context/AuthContextProvider';
import storage from '../../../storage/storage';
import { getWords, getUserAggregatedWords, getUserWords } from '../../../api/apiCalls';
import { WordDTO } from '../../../api/apiCalls.types';
import {
  GROUP_COLORS,
  PAGE_PER_GROUP,
  TextbookGroup,
  WordCardData,
  WORDS_TOTAL,
  WORD_PER_PAGE,
} from './wordListConsts';

import { WordCard } from './WordCard/WordCard';
import { Container, Typography, Grid, Box, Card, CardMedia } from '@mui/material';
import { SkeletonWordCard } from './WordCard/SkeletonWordCard';
import { NoHardWords } from './NoHardWords';

type WordListProps = {
  group: number;
  setGroup: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const WordList: React.FC<WordListProps> = (props) => {
  const { auth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  const [wordList, setWordList] = useState<WordCardData[]>([]);
  const [wordsToDisplay, setWordsToDisplay] = useState<WordCardData[]>([]);
  const [learnedList, setLearnedList] = useState<Array<'hard' | 'easy' | null>>([]);

  const { group, setGroup, page, setPage } = props;

  useEffect(() => {
    setIsLoading(true);
    if (!auth) {
      const dataPromises: Promise<AxiosResponse<WordDTO[]>>[] = [];
      for (let i = 0; i < PAGE_PER_GROUP; i++) {
        dataPromises.push(getWords(group, i));
      }

      Promise.all(dataPromises)
        .then(async (promises) => {
          const wordDataByPage: Array<WordDTO[]> = [];
          for (let i = 0; i < 30; i++) {
            const wordData = await dataPromises[i].then((res) => res.data);
            wordDataByPage.push(wordData);
          }
          const wordsData = wordDataByPage.flat();

          const aggregatedData = wordsData.map((word, index) => {
            const aggregatedWord = Object.assign(word);
            aggregatedWord.listId = index;
            return aggregatedWord;
          });

          const pageWords = aggregatedData.slice(page * WORD_PER_PAGE, (page + 1) * WORD_PER_PAGE);

          setWordList(aggregatedData);
          setLearnedList(aggregatedData.map(() => null));
          setWordsToDisplay(pageWords);
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
      if (group !== TextbookGroup.Hard) {
        const wordPromises: Promise<AxiosResponse<WordDTO[]>>[] = [];
        for (let i = 0; i < PAGE_PER_GROUP; i++) {
          wordPromises.push(getWords(group, i));
        }
        const learnedPromise = getUserWords(auth.userId);
        const dataPromises = [...wordPromises, learnedPromise];

        Promise.all(dataPromises)
          .then(async (promises) => {
            const wordDataByPage: Array<WordDTO[]> = [];
            for (let i = 0; i < 30; i++) {
              const wordData = await wordPromises[i].then((res) => res.data);
              wordDataByPage.push(wordData);
            }

            const wordsData = wordDataByPage.flat();
            const learnedWords = await learnedPromise.then((res) => res.data);
            const learnedData: Array<'hard' | 'easy' | null> = [];
            const aggregatedData = wordsData.map((word, index) => {
              const aggregatedWord = Object.assign(word);
              const id = aggregatedWord.id;
              learnedData[index] = null;
              aggregatedWord.listId = index;

              for (let i = 0; i < learnedWords.length; i++) {
                const learnedWord = learnedWords[i];
                if (id === learnedWord.wordId) {
                  aggregatedWord.userWord = {
                    difficulty: learnedWord.difficulty,
                    optional: learnedWord.optional,
                  };
                  learnedData[index] = learnedWord.difficulty;
                  break;
                }
              }
              return aggregatedWord;
            });

            const pageWords = aggregatedData.slice(
              page * WORD_PER_PAGE,
              (page + 1) * WORD_PER_PAGE
            );

            setWordList(aggregatedData);
            setLearnedList(learnedData);
            setWordsToDisplay(pageWords);
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
            const wordsData = res.data[0].paginatedResults;
            const learnedData: Array<'hard' | 'easy' | null> = [];
            const aggregatedData = wordsData.map((word, index) => {
              const aggregatedWord = Object.assign(word);
              aggregatedWord.id = word._id;
              aggregatedWord.listId = index;
              learnedData[index] = word?.userWord?.difficulty || null;
              return aggregatedWord;
            });

            setWordList(aggregatedData);
            setLearnedList(learnedData);
            setWordsToDisplay(aggregatedData);
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
  }, [group]);

  const removeFromHard = (num: number) => {
    const newHardWordList = [...wordList.slice(0, num), ...wordList.slice(num + 1)];
    setWordsToDisplay(newHardWordList);
    setWordList(newHardWordList);
    setLearnedList(newHardWordList.map((word) => word.userWord.difficulty));
  };

  const defineLearnedPage = (pageNum: number) => {
    const isLearned = learnedList
      .slice(pageNum * WORD_PER_PAGE, (pageNum + 1) * WORD_PER_PAGE)
      .reduce((prev, curr) => prev && !!curr, true);
    return isLearned;
  };

  const changePage = (pageNum: number) => {
    if (page !== pageNum && !isLoading) {
      setIsLoading(true);
      const pageWords = wordList.slice(pageNum * WORD_PER_PAGE, (pageNum + 1) * WORD_PER_PAGE);
      setWordsToDisplay(pageWords);
      setIsLoading(false);
      setPage(pageNum);
      storage.setItem('textbookGroup', group);
      storage.setItem('textbookPage', pageNum);
    }
  };

  const changeGroup = (groupNum: number) => {
    if (group !== groupNum && !isLoading) {
      setIsLoading(true);
      setWordsToDisplay([]);
      setGroup(groupNum);
      setPage(0);
      storage.setItem('textbookGroup', group);
      storage.setItem('textbookPage', page);
    }
  };

  const markWordAsLearned = (listId: number, result: 'easy' | 'hard') => {
    const newLearnedList = learnedList.slice();
    newLearnedList[listId] = result;
    setLearnedList(newLearnedList);
  };

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
            {(auth
              ? ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Сложные слова']
              : ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
            ).map((value, index) => {
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
                      changeGroup(index);
                    }}
                  >
                    {value}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        {group !== TextbookGroup.Hard && (
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
                            : defineLearnedPage(index)
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
                          changePage(index);
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
            {wordsToDisplay.map((word, index) => {
              return (
                <WordCard
                  removeFromHard={removeFromHard}
                  markWordAsLearned={markWordAsLearned}
                  isHardGroup={group === TextbookGroup.Hard}
                  numberInList={index}
                  key={word.id}
                  word={word}
                ></WordCard>
              );
            })}
          </>
        }
        {isLoading &&
          Array(20)
            .fill('')
            .map((elem, index) => {
              return <SkeletonWordCard key={index} />;
            })}
        {auth && !isLoading && group === TextbookGroup.Hard && wordsToDisplay.length === 0 && (
          <NoHardWords />
        )}
      </Grid>
    </Container>
  );
};

export { WordList };
