import React, { useEffect, useState } from 'react';
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

  const [sequence, setSequence] = useState<Array<string>>([]);

  const [points, setPoints] = useState(10);

  const [score, setScore] = useState(0);

  useEffect(() => {
    if (sequence.length === 3) {
      setPoints((current) => current * 2);
      setSequence([]);
    }
  }, [sequence]);

  function onRightClick(wordIndex: number, randomIndex: number) {
    const currentWord = words[wordIndex];
    const translateWord = words[randomIndex];

    if (currentWord.id === translateWord.id) {
      setSequence([...sequence, 'correct']);
      setWordResults([...wordResults, { ...currentWord, status: 'correct' }]);
      setScore((curr) => curr + points);
    } else {
      setSequence([]);
      setPoints(10);

      setWordResults([...wordResults, { ...currentWord, status: 'wrong' }]);
    }
  }

  function onWrongClick(wordIndex: number, randomIndex: number) {
    const currentWord = words[wordIndex];
    const translateWord = words[randomIndex];

    if (currentWord.id === translateWord.id) {
      setSequence([]);
      setPoints(10);

      setWordResults([...wordResults, { ...currentWord, status: 'wrong' }]);
    } else {
      setSequence([...sequence, 'correct']);
      setWordResults([...wordResults, { ...currentWord, status: 'correct' }]);
      setScore((curr) => curr + points);
    }
  }

  return (
    <div>
      {count === 0 || isLastWord ? (
        <div>
          {wordResults.map((word) => (
            <div key={word.id}>
              {word.word} {word.status}
            </div>
          ))}
          <h2>{score}</h2>
          <button
            onClick={() => {
              resetCountdown(), startCountdown(), setIsLastWord(false), setIsGameStarted(false);
            }}
          >
            играть еще
          </button>
        </div>
      ) : (
        <>
          {sequence.map((value, idx) => (
            <p key={idx}>v</p>
          ))}
          <h2>{score}</h2>
          <SprintCard
            onRightClick={onRightClick}
            onWrongClick={onWrongClick}
            setIsLastWord={setIsLastWord}
            words={words}
            count={count}
          />
        </>
      )}
    </div>
  );
}
