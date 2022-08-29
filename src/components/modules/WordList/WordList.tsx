import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useAuthContext } from '../../../context/AuthContextProvider';
import storage from '../../../storage/storage';
import { getWords, getUserAggregatedWords } from '../../../api/apiCalls';
import { UserAggregatedWord, UserAggregatedWords } from '../../../api/apiCalls.types';
import { PAGE_PER_GROUP, TextbookTab, WORDS_TOTAL, WORD_PER_PAGE } from './wordListConsts';

import { WordCard } from '../../base';
import {
  Container,
  Pagination,
  Typography,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';

const WordList: React.FC = () => {
  const { auth } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [wordList, setWordList] = useState<UserAggregatedWord[]>([]);
  const [group, setGroup] = useState(storage.getItem('textbookGroup') || 1);
  const [page, setPage] = useState(storage.getItem('textbookPage') || 1);
  const [learnedPages, setLearnedPages] = useState(new Array(PAGE_PER_GROUP));
  const [learnedWords, setLearnedWords] = useState(new Array(WORD_PER_PAGE));

  useEffect(() => {
    setIsLoading(true);
    if (!auth) {
      getWords(group - 1, page - 1)
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
        getUserAggregatedWords(auth.userId, group - 1, page - 1, WORD_PER_PAGE)
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

  //unrealized functionality of learned pages, TODO
  useEffect(() => {
    if (auth && page !== TextbookTab.Hard) {
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
  //

  return (
    <Container sx={{ mb: 2 }}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Container sx={{ display: 'flex' }}>
          <Tabs
            sx={{ mb: 2, mx: 'auto' }}
            centered
            variant="scrollable"
            value={group}
            onChange={(event: React.SyntheticEvent, value: number) => {
              setGroup(value);
              setPage(1);
              setWordList([]);
            }}
          >
            <Tab disabled={isLoading ? true : false} label="A1" value={TextbookTab.A1} />
            <Tab disabled={isLoading ? true : false} label="A2" value={TextbookTab.A2} />
            <Tab disabled={isLoading ? true : false} label="B1" value={TextbookTab.B1} />
            <Tab disabled={isLoading ? true : false} label="B2" value={TextbookTab.B2} />
            <Tab disabled={isLoading ? true : false} label="C1" value={TextbookTab.C1} />
            <Tab disabled={isLoading ? true : false} label="C2" value={TextbookTab.C2} />
            {auth && (
              <Tab
                disabled={isLoading ? true : false}
                label="Сложные слова"
                value={TextbookTab.Hard}
              />
            )}
          </Tabs>
        </Container>
        {group !== TextbookTab.Hard && (
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
        )}
        {auth && learnedWords.reduce((prev, curr) => prev && !!curr, true) && (
          <Typography variant="h5" align="center">
            На данной странице изучены все слова
          </Typography>
        )}
        {
          <>
            {wordList.map((word) => {
              return <WordCard key={word._id} {...word}></WordCard>;
            })}
          </>
        }
        {isLoading && <CircularProgress color="primary" />}
      </Grid>
    </Container>
  );
};

export { WordList };
