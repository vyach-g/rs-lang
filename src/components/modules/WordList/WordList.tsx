import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContextProvider';
import storage from '../../../storage/storage';
import { getWords, getUserWords, getUserAggregatedWords } from '../../../api/apiCalls';
import {
  Container,
  Pagination,
  Typography,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  Box,
  PaginationItem,
} from '@mui/material';
import { WordCard } from '../../base';
import { WordDTO, UserAggregatedWord, UserAggregatedWords } from '../../../api/apiCalls.types';
import { PAGE_PER_GROUP, WORD_PER_PAGE } from './wordListConsts';
import { AxiosResponse } from 'axios';

const WordList: React.FC = () => {
  const { auth } = useAuthContext();
  const [wordList, setWordList] = useState<WordDTO[] | UserAggregatedWord[]>([]);
  const [group, setGroup] = useState(storage.getItem('textbookGroup') || 1);
  const [page, setPage] = useState(storage.getItem('textbookPage') || 1);
  const [learnedPages, setLearnedPages] = useState(new Array(PAGE_PER_GROUP));
  const [learnedWords, setLearnedWords] = useState(new Array(WORD_PER_PAGE));

  useEffect(() => {
    if (!auth) {
      getWords(group - 1, page - 1)
        .then((response) => {
          setWordList(response.data);
          storage.setItem('textbookGroup', group);
          storage.setItem('textbookPage', page);
          console.log('unauthWords', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (group !== 7) {
        getUserAggregatedWords(auth.userId, group - 1, page - 1, WORD_PER_PAGE).then((res) => {
          const words = res.data[0].paginatedResults;
          const learned = words.map((word) => !!word?.userWord?.difficulty);
          setWordList(words);
          setLearnedWords(learned);
          storage.setItem('textbookGroup', group);
          storage.setItem('textbookPage', page);
        });
      } else {
        getUserAggregatedWords(
          auth.userId,
          undefined,
          undefined,
          4000,
          JSON.stringify({ 'userWord.difficulty': 'hard' })
        ).then((res) => {
          const words = res.data[0].paginatedResults;
          console.log('group', group);
          console.log('hardWords', words);
          setWordList(words);
          storage.setItem('textbookGroup', group);
        });
      }
    }
  }, [group, page]);

  useEffect(() => {
    if (auth && page !== 7) {
      const pagesPromises: Promise<AxiosResponse<UserAggregatedWords>>[] = [];
      for (let i = 0; i < PAGE_PER_GROUP; i++) {
        pagesPromises.push(getUserAggregatedWords(auth.userId, group - 1, i, WORD_PER_PAGE));
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
  }, [group]);

  return (
    <Container sx={{ mb: 2 }}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Box>
          <Tabs
            sx={{ mb: 2, px: 3 }}
            centered
            value={group}
            onChange={(event: React.SyntheticEvent, value: number) => {
              setGroup(value);
              setPage(1);
            }}
          >
            <Tab label="A1" value={1} />
            <Tab label="A2" value={2} />
            <Tab label="B1" value={3} />
            <Tab label="B2" value={4} />
            <Tab label="C1" value={5} />
            <Tab label="C2" value={6} />
            {auth && <Tab label="Сложные слова" value={7} />}
          </Tabs>
        </Box>
        {group !== 7 && (
          <Pagination
            count={PAGE_PER_GROUP}
            page={page}
            onChange={(event, num) => {
              setPage(num);
            }}
            siblingCount={1}
            color="primary"
            // renderItem={(item) => {
            //   console.log('item', item);
            //   const isLearned = learnedPages[page - 1];
            //   console.log('isLearned', isLearned);
            //   return (
            //     <PaginationItem
            //       {...item}
            //       color="primary"
            //       size={isLearned ? 'medium' : 'large'}
            //       sx={{ backgroundColor: isLearned ? 'red' : null }}
            //     />
            //   );
            // }}
          />
        )}
        {learnedWords.reduce((prev, curr) => prev && !!curr, true) && (
          <Typography variant="h5" align="center">
            На данной странице изучены все слова
          </Typography>
        )}
        {!!wordList.length && (
          <>
            {wordList.map((word) => {
              // @ts-expect-error
              return <WordCard key={word.id || word._id} {...word}></WordCard>;
            })}
          </>
        )}
        {!wordList.length && <CircularProgress color="primary" />}
      </Grid>
    </Container>
  );
};

export { WordList };
