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
} from '@mui/material';
import { WordCard } from '../../base';
import { WordDTO, UserAggregatedWord } from '../../../api/apiCalls.types';
import { PAGE_PER_GROUP, WORD_PER_PAGE } from './wordListConsts';

const WordList: React.FC = () => {
  const { auth } = useAuthContext();
  const [wordList, setWordList] = useState<WordDTO[] | UserAggregatedWord[]>([]);
  const [group, setGroup] = useState(storage.getItem('textbookGroup') || 1);
  const [page, setPage] = useState(storage.getItem('textbookPage') || 1);

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
        getUserAggregatedWords(
          auth.userId,
          group - 1,
          page - 1,
          WORD_PER_PAGE
          // JSON.stringify({ $or: [{ 'userWord.difficulty': 'easy' }, { userWord: null }] })
        ).then((res) => {
          const words = res.data[0].paginatedResults;
          console.log('agregWords', words);
          setWordList(words);
          storage.setItem('textbookGroup', group);
          storage.setItem('textbookPage', page);
        });
      } else {
        getUserAggregatedWords(
          auth.userId,
          undefined,
          undefined,
          undefined,
          JSON.stringify({ $or: [{ 'userWord.difficulty': 'easy' }, { userWord: null }] })
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

  return (
    <Container sx={{ mb: 2 }}>
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
          <Tab label="Group 1" value={1} />
          <Tab label="Group 2" value={2} />
          <Tab label="Group 3" value={3} />
          <Tab label="Group 4" value={4} />
          <Tab label="Group 5" value={5} />
          <Tab label="Group 6" value={6} />
          {auth && <Tab label="Сложные слова" value={7} />}
        </Tabs>
      </Box>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        {!!wordList.length && (
          <>
            {wordList.map((word) => {
              // @ts-expect-error
              return <WordCard key={word.id || word._id} {...word}></WordCard>;
            })}
            {group !== 7 && (
              <Pagination
                count={PAGE_PER_GROUP}
                page={page}
                onChange={(event, num) => {
                  setPage(num);
                }}
                siblingCount={1}
                color="primary"
              />
            )}
          </>
        )}
        {!wordList.length && <CircularProgress />}
      </Grid>
    </Container>
  );
};

export { WordList };
