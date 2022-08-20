import React from 'react';
import { WordDTO } from '../../../api/apiCalls.types';
import SprintCard from './SprintCard';

export default function Sprint({
  words,
  count,
  resetCountdown,
  startCountdown,
}: {
  words: Array<WordDTO>;
  count: number;
  resetCountdown: () => void;
  startCountdown: () => void;
}) {
  return (
    <div>
      {count === 0 ? (
        <h1>
          modal{' '}
          <button
            onClick={() => {
              resetCountdown(), startCountdown();
            }}
          >
            играть еще
          </button>
        </h1>
      ) : (
        <SprintCard words={words} count={count} />
      )}
    </div>
  );
}
