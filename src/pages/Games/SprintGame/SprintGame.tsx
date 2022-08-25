import React, { useState } from 'react';
import { useCountdown } from 'usehooks-ts';
import { getWords } from '../../../api/apiCalls';
import { WordDTO } from '../../../api/apiCalls.types';
import { withAsync } from '../../../api/helpers/withAsync';
import Sprint from './Sprint';
import { Content, LevelButton, Levels, SubmitButton, Wrapper } from './Sprint.styles';

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
    countStart: 20,
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
