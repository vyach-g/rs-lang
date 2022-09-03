import React, { useEffect, useState, useRef, createRef, LegacyRef } from 'react';
import { SignInDTO, WordDTO } from '../../../api/apiCalls.types';
import {
  AudioIcon,
  BackButton,
  BoldWord,
  Circle,
  Content,
  ContentHeader,
  ContentResults,
  CounterContainer,
  ExitLink,
  FilledCircle,
  GameContainer,
  HeaderText,
  OneWord,
  ResultsHeader,
  ResultsHeaderULCorrect,
  ResultsHeaderULWrong,
  ResultsWords,
  SubmitButton,
} from './Sprint.styles';
import SprintCard from './SprintCard';
import icosound from '../../../assets/ico-sound.svg';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';
import { useCountdown } from 'usehooks-ts';
import { Stack } from '@mui/material';
import exit from '../../../assets/exit.svg';
import { addWordStat, getUserStatistics, updateUserStatistics } from '../../../api/apiCalls';
import storage from '../../../storage/storage';
import { withAsync } from '../../../api/helpers/withAsync';

function Counter(props: { handleFinish: () => void }) {
  const [count, { startCountdown }] = useCountdown({
    countStart: 20,
    intervalMs: 1000,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  if (count === 0) {
    props.handleFinish();
  }

  return <p style={{ lineHeight: 0, margin: 0 }}>{count}</p>;
}

export default function Sprint({
  words,
  setIsGameStarted,
}: {
  words: Array<WordDTO>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const [isLastWord, setIsLastWord] = useState(false);

  const [wordResults, setWordResults] = useState<Array<WordDTO & { status: string }>>([]);

  const [sequence, setSequence] = useState<Array<string>>([]);

  const [longestSeries, setLongestSeries] = useState<{ current: number; previous: number }>({
    current: 0,
    previous: 0,
  });

  const [points, setPoints] = useState(10);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (sequence.length === 3) {
      setPoints((current) => current * 2);
      setSequence([]);
    }
  }, [sequence]);

  async function onRightClick(wordIndex: number, randomIndex: number) {
    const currentWord = words[wordIndex];
    const translateWord = words[randomIndex];

    if (currentWord.id === translateWord.id) {
      addWordStat(currentWord, true, 'sprint');
      setSequence([...sequence, 'correct']);
      setWordResults([...wordResults, { ...currentWord, status: 'correct' }]);
      setScore((curr) => curr + points);

      setLongestSeries((state) => ({ ...state, current: state.current + 1 }));
    } else {
      setSequence([]);
      setPoints(10);
      setWordResults([...wordResults, { ...currentWord, status: 'wrong' }]);
      addWordStat(currentWord, false, 'sprint');

      setLongestSeries((state) => {
        if (state.current > state.previous) {
          return {
            current: 0,
            previous: state.current,
          };
        }

        return { ...state, current: 0 };
      });
    }
  }

  function onWrongClick(wordIndex: number, randomIndex: number) {
    const currentWord = words[wordIndex];
    const translateWord = words[randomIndex];

    if (currentWord.id === translateWord.id) {
      setSequence([]);
      setPoints(10);
      setWordResults([...wordResults, { ...currentWord, status: 'wrong' }]);
      addWordStat(currentWord, false, 'sprint');
      setLongestSeries((state) => {
        if (state.current > state.previous) {
          return {
            current: 0,
            previous: state.current,
          };
        }

        return { ...state, current: 0 };
      });
    } else {
      setSequence([...sequence, 'correct']);
      setWordResults([...wordResults, { ...currentWord, status: 'correct' }]);
      setScore((curr) => curr + points);
      addWordStat(currentWord, true, 'sprint');
      setLongestSeries((state) => ({ ...state, current: state.current + 1 }));
    }
  }

  const [isFinish, setIsFinish] = useState(false);
  function handleFinish() {
    setIsFinish(true);
  }

  const wrongRefs = useRef(new Array(wordResults.filter((word) => word.status === 'wrong').length));

  const correctRefs = useRef(
    new Array(wordResults.filter((word) => word.status === 'correct').length)
  );

  async function addGameStat() {
    const auth = storage.getItem<SignInDTO>('auth');

    if (auth) {
      const { response, error } = await withAsync(() => getUserStatistics(auth.userId));

      const timeStamp = Date.now();

      if (error) {
        await updateUserStatistics(auth.userId, {
          learnedWords: score,
          optional: {
            [timeStamp]: {
              sprint: {
                totalWords: wordResults.length,
                correctAnswers: wordResults.filter((word) => word.status === 'correct').length,
                wrongAnswers: wordResults.filter((word) => word.status === 'wrong').length,
                longestSeries: longestSeries.previous,
              },
            },
          },
        });
      } else if (response && response.status == 200) {
        const { data } = response;
        const { learnedWords, ...rest } = data;

        await updateUserStatistics(auth.userId, {
          learnedWords: score + learnedWords,
          optional: {
            ...rest.optional,
            [timeStamp]: {
              sprint: {
                totalWords: wordResults.length,
                correctAnswers: wordResults.filter((word) => word.status === 'correct').length,
                wrongAnswers: wordResults.filter((word) => word.status === 'wrong').length,
                longestSeries: longestSeries.previous,
              },
            },
          },
        });
      }
    }
  }

  useEffect(() => {
    if (isFinish || isLastWord) addGameStat();
  }, [isFinish, isLastWord]);

  return (
    <div>
      {isFinish || isLastWord ? (
        <ContentResults>
          <ContentHeader>Твой результат: {score} очков</ContentHeader>
          <ResultsWords>
            <ResultsHeader>
              Ошибок{' '}
              <ResultsHeaderULWrong>
                {wordResults.filter((word) => word.status === 'wrong').length}
              </ResultsHeaderULWrong>
            </ResultsHeader>
            {wordResults
              .filter((word) => word.status === 'wrong')
              .map((word, idx) => (
                <OneWord key={word.id}>
                  <AudioIcon src={icosound} onClick={() => wrongRefs.current[idx].play()} />
                  <audio ref={(el) => (wrongRefs.current[idx] = el)}>
                    <source
                      src={`https://rslang-project1.herokuapp.com/${word.audio}`}
                      type="audio/mp3"
                    />
                  </audio>
                  <span>
                    <BoldWord>{word.word}</BoldWord> - {word.wordTranslate}
                  </span>
                </OneWord>
              ))}{' '}
            <ResultsHeader>
              Знаю{' '}
              <ResultsHeaderULCorrect>
                {wordResults.filter((word) => word.status === 'correct').length}
              </ResultsHeaderULCorrect>
            </ResultsHeader>
            {wordResults
              .filter((word) => word.status === 'correct')
              .map((word, idx) => (
                <OneWord key={word.id}>
                  <AudioIcon src={icosound} onClick={() => correctRefs.current[idx].play()} />
                  <audio ref={(el) => (correctRefs.current[idx] = el)}>
                    <source
                      src={`https://rslang-project1.herokuapp.com/${word.audio}`}
                      type="audio/mp3"
                    />
                  </audio>
                  <span>
                    <BoldWord>{word.word}</BoldWord> - {word.wordTranslate}
                  </span>
                </OneWord>
              ))}
          </ResultsWords>

          <SubmitButton
            onClick={() => {
              setIsLastWord(false), setIsGameStarted(false);
            }}
          >
            Продолжить тренировку
          </SubmitButton>
          <BackButton onClick={() => navigate(RoutePaths.Games)}>К списку тренировок</BackButton>
        </ContentResults>
      ) : (
        <Content>
          <HeaderText>{score}</HeaderText>
          <GameContainer>
            <CounterContainer>
              <Link to="/games">
                <ExitLink src={exit}></ExitLink>
              </Link>
              <Counter handleFinish={handleFinish} />
            </CounterContainer>
            <div>+{points}</div>
            <Stack justifyContent="center" direction="row" spacing={2}>
              {sequence.length !== 0 ? (
                sequence.map((value, idx) => <FilledCircle key={idx}></FilledCircle>)
              ) : (
                <Circle></Circle>
              )}
            </Stack>

            <SprintCard
              onRightClick={onRightClick}
              onWrongClick={onWrongClick}
              setIsLastWord={setIsLastWord}
              words={words}
            />
          </GameContainer>
        </Content>
      )}
    </div>
  );
}
