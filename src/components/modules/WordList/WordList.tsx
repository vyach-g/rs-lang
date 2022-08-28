interface Word {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

import React, { useEffect, useState } from 'react';
import storage from '../../../storage/storage';
import { getWords } from '../../../api/apiCalls';
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
import { WordDTO } from '../../../api/apiCalls.types';
import { PAGE_PER_GROUP } from './wordListConsts';

const WordList: React.FC = () => {
  const [wordList, setWordList] = useState<WordDTO[]>([]);
  const [group, setGroup] = useState(storage.getItem('textbookGroup') || 1);
  const [page, setPage] = useState(storage.getItem('textbookPage') || 1);

  useEffect(() => {
    getWords(group - 1, page - 1)
      .then((response) => {
        setWordList(response.data);
        storage.setItem('textbookGroup', group);
        storage.setItem('textbookPage', page);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [group, page]);

  return (
    <Container>
      <Box>
        <Tabs
          sx={{ mb: 2, px: 3 }}
          centered
          value={group}
          onChange={(event: React.SyntheticEvent, value: number) => setGroup(value)}
        >
          <Tab label="Group 1" value={1} />
          <Tab label="Group 2" value={2} />
          <Tab label="Group 3" value={3} />
        </Tabs>
      </Box>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        {!!wordList.length && (
          <>
            {wordList.map((word) => {
              return <WordCard key={word.id} {...word}></WordCard>;
            })}
            <Pagination
              count={PAGE_PER_GROUP}
              page={page}
              onChange={(event, num) => setPage(num)}
              siblingCount={2}
              color="primary"
            />
          </>
        )}
        {!wordList.length && <CircularProgress />}
      </Grid>
    </Container>
  );
};

export { WordList };
