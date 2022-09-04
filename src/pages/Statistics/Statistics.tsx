import React, { useCallback, useEffect, useState } from 'react';

import { Default } from '../../components/layout';

import { Box, Stack, Typography } from '@mui/material';
import { GameStats, SignInDTO, UserStatisticsDTO, UserWordsDTO } from '../../api/apiCalls.types';
import { withAsync } from '../../api/helpers/withAsync';
import { getUserStatistics, getUserWords } from '../../api/apiCalls';
import { useAuthContext } from '../../context/AuthContextProvider';
import {
  FilledProgress,
  FilledProgressSpan,
  GameCardAudiocall,
  GameCardSavannah,
  GameCardSprint,
  Progress,
  GameStatsRows,
  TotalCard,
  TotalScoreImg,
  TotalScoreText,
  TotalScoreValue,
  WordsCard,
  WordsImg,
  WordsText,
  WordsValue,
  Wrapper,
  Today,
  TodayText,
  TodayTable,
  TodayItem,
  TodayItemName,
  TodayItemValue,
} from './Statistics.styles';
import { GameAction, GameName } from '../Games/Games.styles';

const Statistics = () => {
  const { auth } = useAuthContext();
  const [stats, setStats] = useState<UserStatisticsDTO>();

  const [todayStats, setTodayStats] = useState<Array<GameStats | undefined>>([]);

  const getStats = useCallback(async () => {
    const { response } = await withAsync(() => getUserStatistics(auth!.userId));

    if (response) {
      for (let timestamp in response.data.optional) {
        const d = new Date(+timestamp).toLocaleDateString('ru-RU');

        const today = new Date().toLocaleDateString('ru-RU');

        if (d == today && response.data.optional) {
          const value = response.data.optional[timestamp];
          setTodayStats((curr) => {
            return [...curr, value];
          });
        }
      }
    }

    response && setStats(response.data);
  }, []);

  const [wordStats, setWordStats] = useState<Array<UserWordsDTO>>();
  const getWordsStats = useCallback(async () => {
    const { response } = await withAsync(() => getUserWords(auth!.userId));

    response && setWordStats(response.data);
  }, []);

  useEffect(() => {
    getStats();
    getWordsStats();
  }, [getStats, getWordsStats]);

  const sprintTodayStats = todayStats.filter((stat) => {
    if (stat && Object.keys(stat)[0] === 'sprint') {
      return stat;
    }
  });

  const audioTodayStats = todayStats.filter((stat) => {
    if (stat && Object.keys(stat)[0] === 'audiocall') {
      return stat;
    }
  });

  const savannahTodayStats = todayStats.filter((stat) => {
    if (stat && Object.keys(stat)[0] === 'savannah') {
      return stat;
    }
  });

  const sprintTotalWords =
    sprintTodayStats.length &&
    sprintTodayStats.reduce((acc, curr) => acc + curr?.sprint?.totalWords!, 0);

  const sprintCorrectAnswers =
    sprintTodayStats.length &&
    sprintTodayStats.reduce((acc, curr) => acc + curr?.sprint?.correctAnswers!, 0);

  const sprintLongestSeries =
    sprintTodayStats.length &&
    Math.max(...sprintTodayStats.map((stat) => stat?.sprint?.longestSeries!));

  const audioTotalWords =
    audioTodayStats.length &&
    audioTodayStats.reduce((acc, curr) => acc + curr?.audiocall?.totalWords!, 0);

  const audioCorrectAnswers =
    audioTodayStats.length &&
    audioTodayStats.reduce((acc, curr) => acc + curr?.audiocall?.correctAnswers!, 0);

  const audioLongestSeries =
    audioTodayStats.length &&
    Math.max(...audioTodayStats.map((stat) => stat?.audiocall?.longestSeries!));

  const savannahTotalWords =
    savannahTodayStats.length &&
    savannahTodayStats.reduce((acc, curr) => acc + curr?.savannah?.totalWords!, 0);

  const savannahCorrectAnswers =
    savannahTodayStats.length &&
    savannahTodayStats.reduce((acc, curr) => acc + curr?.savannah?.correctAnswers!, 0);

  const savannahLongestSeries =
    savannahTodayStats.length &&
    Math.max(...savannahTodayStats.map((stat) => stat?.savannah?.longestSeries!));

  const totalWordsLearned = wordStats?.length;

  const todayWords = wordStats?.filter((word) => {
    const today = new Date().toLocaleDateString('ru-RU');
    const timestamp = Object.keys(word.optional!)[0];
    const d = new Date(+timestamp).toLocaleDateString('ru-RU');
    if (d == today) {
      return word;
    }
  });

  const todayLearnedWords = todayWords?.filter((word) => {
    if (word.difficulty === 'easy') {
      return word;
    }
  });

  const todayNewSprintWords = todayWords?.filter((word) => {
    const timestamp = Object.keys(word.optional!)[0];

    if (word.optional![timestamp].game === 'sprint') {
      return word;
    }
  });

  const todayNewAudioWords = todayWords?.filter((word) => {
    const timestamp = Object.keys(word.optional!)[0];

    if (word.optional![timestamp].game === 'audiocall') {
      return word;
    }
  });
  
  const todayNewSavannahWords = todayWords?.filter((word) => {
    const timestamp = Object.keys(word.optional!)[0];

    if (word.optional![timestamp].game === 'savannah') {
      return word;
    }
  });

  return (
    <Default>
      <Wrapper>
        <Box
          sx={{
            height: 'calc(100vh - 203px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
          }}
        >
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TotalCard>
              <TotalScoreImg>
                <TotalScoreValue>{stats?.learnedWords || 0}</TotalScoreValue>
              </TotalScoreImg>
              <TotalScoreText>баллов</TotalScoreText>
            </TotalCard>
            <WordsCard>
              <WordsText>изучено слов - {totalWordsLearned}</WordsText>
              <Progress>
                <FilledProgress
                  style={{ width: `${Math.round((totalWordsLearned! / 3600) * 100)}%` }}
                >
                  <FilledProgressSpan></FilledProgressSpan>
                </FilledProgress>
              </Progress>
              <WordsImg>
                <WordsValue>{Math.round((totalWordsLearned! / 3600) * 100)}%</WordsValue>
              </WordsImg>
            </WordsCard>
          </Stack>
          <br></br>
          <Today>
            <TodayText>за сегодня</TodayText>
            <TodayTable>
              <TodayItem>
                <TodayItemName>Новые слова:</TodayItemName>
                <TodayItemValue>{todayWords?.length}</TodayItemValue>
              </TodayItem>
              <TodayItem>
                <TodayItemName>Изученные слова:</TodayItemName>
                <TodayItemValue>{todayLearnedWords?.length}</TodayItemValue>
              </TodayItem>
              <TodayItem>
                <TodayItemName>Правильных ответов:</TodayItemName>
                <TodayItemValue>
                  {todayWords?.length
                    ? Math.round((todayLearnedWords!.length / todayWords!.length) * 100)
                    : 0}
                  %
                </TodayItemValue>
              </TodayItem>
            </TodayTable>
          </Today>
          <br></br>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <GameCardSprint>
              <GameName>Спринт</GameName>
              <GameStatsRows>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Новые слова</GameAction>
                  <GameAction>{todayNewSprintWords?.length}</GameAction>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Самая длинная серия</GameAction>
                  <GameAction>{sprintLongestSeries}</GameAction>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Процент правильных ответов</GameAction>
                  <GameAction>
                    {Math.round((sprintCorrectAnswers / sprintTotalWords) * 100) || 0}%
                  </GameAction>
                </Stack>
              </GameStatsRows>
            </GameCardSprint>
            <GameCardAudiocall>
              <GameName>Аудиовызов</GameName>
              <GameStatsRows>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Новые слова</GameAction>
                  <GameAction>{todayNewAudioWords?.length}</GameAction>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Самая длинная серия</GameAction>
                  <GameAction>{audioLongestSeries}</GameAction>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Процент правильных ответов</GameAction>
                  <GameAction>
                    {Math.round((audioCorrectAnswers / audioTotalWords) * 100) || 0}%
                  </GameAction>
                </Stack>
              </GameStatsRows>
            </GameCardAudiocall>
            <GameCardSavannah>
              <GameName>Саванна</GameName>
              <GameStatsRows>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Новые слова</GameAction>
                  <GameAction>{todayNewSavannahWords?.length}</GameAction>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Самая длинная серия</GameAction>
                  <GameAction>{savannahLongestSeries}</GameAction>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GameAction>Процент правильных ответов</GameAction>
                  <GameAction>
                    {Math.round((savannahCorrectAnswers / savannahTotalWords) * 100) || 0}%
                  </GameAction>
                </Stack>
              </GameStatsRows>
            </GameCardSavannah>
          </Stack>
        </Box>
      </Wrapper>
    </Default>
  );
};

export { Statistics };
