import React, { useState } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';
import SprintCard from './SprintCard';

export default function Sprint({
  words,
  count,
  resetCountdown,
  startCountdown,
  setIsGameStarted,
}: {
  words: Array<WordDTO>;
  count: number;
  resetCountdown: () => void;
  startCountdown: () => void;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLastWord, setIsLastWord] = useState(false);

  const [wordResults, setWordResults] = useState<Array<WordDTO & { status: string }>>([]);

  function onRightClick(wordIndex: number, randomIndex: number) {
    const currentWord = words[wordIndex];
    const translateWord = words[randomIndex];

    if (currentWord.id === translateWord.id) {
      setWordResults([...wordResults, { ...currentWord, status: 'correct' }]);
    } else {
      setWordResults([...wordResults, { ...currentWord, status: 'wrong' }]);
    }
  }

  function onWrongClick(wordIndex: number, randomIndex: number) {
    const currentWord = words[wordIndex];
    const translateWord = words[randomIndex];

    if (currentWord.id === translateWord.id) {
      setWordResults([...wordResults, { ...currentWord, status: 'wrong' }]);
    } else {
      setWordResults([...wordResults, { ...currentWord, status: 'correct' }]);
    }
  }

  return (
    <div>
      {count === 0 || isLastWord ? (
        <h1>
          {wordResults.map((word) => (
            <div key={word.id}>
              {word.word} {word.status}
            </div>
          ))}
          <button
            onClick={() => {
              resetCountdown(), startCountdown(), setIsLastWord(false), setIsGameStarted(false);
            }}
          >
            играть еще
          </button>
        </h1>
      ) : (
        <SprintCard
          onRightClick={onRightClick}
          onWrongClick={onWrongClick}
          setIsLastWord={setIsLastWord}
          words={words}
          count={count}
        />
      )}
    </div>
  );
}
