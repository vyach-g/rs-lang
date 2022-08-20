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

  return (
    <div>
      {count === 0 || isLastWord ? (
        <h1>
          modal{' '}
          <button
            onClick={() => {
              resetCountdown(), startCountdown(), setIsLastWord(false), setIsGameStarted(false);
            }}
          >
            играть еще
          </button>
        </h1>
      ) : (
        <SprintCard setIsLastWord={setIsLastWord} words={words} count={count} />
      )}
    </div>
  );
}
