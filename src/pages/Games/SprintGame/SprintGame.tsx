import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getWords } from '../../../api/apiCalls';
import { WordDTO } from '../../../api/apiCalls.types';
import { withAsync } from '../../../api/helpers/withAsync';
import Sprint from './Sprint';
import {
  Content,
  CounterContainer,
  ExitLink,
  LevelButton,
  Levels,
  SubmitButton,
  Wrapper,
} from './Sprint.styles';
import exit from '../../../assets/exit.svg';
import { ShowcaseProps } from '../../../components/modules/Showcase/Showcase';

const difficultyButtons = [
  {
    title: 'Легкий-1',
    value: 0,
  },
  {
    title: 'Легкий-2',
    value: 1,
  },
  {
    title: 'Средний-1',
    value: 2,
  },
  {
    title: 'Средний-2',
    value: 3,
  },
  {
    title: 'Сложный-1',
    value: 4,
  },
  {
    title: 'Сложный-2',
    value: 5,
  },
];

export default function SprintGame({ customWords = [] }: { customWords?: Array<WordDTO> }) {
  const [words, setWords] = useState<Array<WordDTO>>(customWords);

  const [level, setLevel] = useState<number | undefined>(undefined);

  const [isGameStarted, setIsGameStarted] = useState(customWords.length ? true : false);

  const [activeButton, setActiveButton] = useState<number | null>(null);

  const [apiStatus, setApiStatus] = useState('IDLE');

  function selectDifficulty(level: number) {
    setLevel(level);
  }

  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { group, page } = state as ShowcaseProps;

      startGame(page, group);
    }
  }, []);

  async function startGame(page?: number, group?: number) {
    const defaultPage = Math.floor(Math.random() * 30);

    const requestPage = page ? page : defaultPage;
    const requestLevel = group ? group : level;

    setApiStatus('PENDING');
    const { response, error } = await withAsync(() => getWords(requestLevel, requestPage));
    if (response) {
      setWords(response.data);
      setIsGameStarted(true);
      setApiStatus('SUCCESS');
    } else if (error) {
      setApiStatus('ERROR');
    }
  }

  return (
    <Wrapper>
      {!isGameStarted ? (
        <Content>
          <CounterContainer>
            <Link to="/games">
              <ExitLink src={exit}></ExitLink>
            </Link>
          </CounterContainer>
          <h1>Научись быстро переводить слова</h1>
          <Levels>
            {difficultyButtons.map((button) => {
              return (
                <LevelButton
                  key={button.value}
                  onClick={() => {
                    selectDifficulty(button.value);
                    setActiveButton(button.value);
                  }}
                  isActive={activeButton === button.value}
                >
                  {button.title}
                </LevelButton>
              );
            })}
          </Levels>
          <SubmitButton onClick={() => startGame()} disabled={apiStatus === 'PENDING' || !level}>
            {' '}
            {apiStatus === 'PENDING' ? (
              <CircularProgress size={20} />
            ) : typeof level === 'undefined' ? (
              'Выбери сложность'
            ) : (
              'Начать тренировку'
            )}
          </SubmitButton>
        </Content>
      ) : (
        <>
          <Sprint words={words} setIsGameStarted={setIsGameStarted} />
        </>
      )}
    </Wrapper>
  );
}
