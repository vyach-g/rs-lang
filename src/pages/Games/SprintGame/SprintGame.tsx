import React, { useState } from 'react';
import { useCountdown } from 'usehooks-ts';
import { getWords } from '../../../api/apiCalls';
import { WordDTO } from '../../../api/apiCalls.types';
import { withAsync } from '../../../api/helpers/withAsync';
import Sprint from './Sprint';
import styled from 'styled-components/macro';
import bgbottom from '../../../assets/bg-bottom.svg';
import bgleft from '../../../assets/bg-left.svg';
import bgright from '../../../assets/bg-right.svg';

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
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 40,
    intervalMs: 1000,
  });

  const [level, setLevel] = useState<number | undefined>(undefined);

  const [isGameStarted, setIsGameStarted] = useState(customWords.length ? true : false);

  const [activeButton, setActiveButton] = useState<number | null>(null);

  function selectDifficulty(level: number) {
    setLevel(level);
  }

  async function startGame() {
    const page = Math.floor(Math.random() * 30);
    const { response, error } = await withAsync(() => getWords(level, page));
    if (response) {
      setWords(response.data);
      setIsGameStarted(true);
      startCountdown();
    }
  }

  return (
    <Wrapper>
      {!isGameStarted ? (
        <Content>
          <h1>Научись быстро переводить слова</h1>
          <h2>Выбери сложность</h2>
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
          <SubmitButton onClick={startGame}>Начать тренировку</SubmitButton>
        </Content>
      ) : (
        <Sprint
          words={words}
          count={count}
          resetCountdown={resetCountdown}
          startCountdown={startCountdown}
          setIsGameStarted={setIsGameStarted}
        />
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  background-color: #0d3848;
  background-image: url(${bgbottom}), url(${bgleft}), url(${bgright});
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 100%, auto, auto;
  background-position: bottom, 0 0, 100% 0;
  box-sizing: border-box;
  height: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Open Sans, sans-serif;
  color: #fff;
  font-size: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Levels = styled.div`
  display: flex;
  gap: 5px;
`;

export const LevelButton = styled.button<{ isActive?: boolean }>`
  background: ${(props) => (props.isActive ? '#2582e7' : 'none')};
  padding: 10px 20px;
  color: #fff;
  font-size: 14px;
  border: 1px solid rgba(37, 130, 231, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(37, 130, 231, 0.12);
  }
`;

const SubmitButton = styled(LevelButton)`
  margin-top: 40px;
  background: rgba(37, 130, 231, 0.08);
  color: #2582e7;
  padding: 10px 42px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
`;
