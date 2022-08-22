import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';
import './SprintCard.css';

function randomizer(wordIndex: number) {
  return Math.random() - 0.6 < 0 ? wordIndex : Math.floor(Math.random() * 19);
}

export default function SprintCard({
  count,
  words,
  setIsLastWord,
  onRightClick,
  onWrongClick,
}: {
  count: number;
  words: Array<WordDTO>;
  setIsLastWord: Dispatch<SetStateAction<boolean>>;
  onRightClick(wordIndex: number, randomIndex: number): void;
  onWrongClick(wordIndex: number, randomIndex: number): void;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [randomIndex, setRandomIndex] = useState(() => randomizer(wordIndex));

  useEffect(() => {
    if (wordIndex >= words.length) {
      setIsLastWord(true);
    }
  }, [wordIndex]);

  return wordIndex <= 19 ? (
    <div>
      <h3>{count}</h3>

      <div>
        <audio
          controls
          controlsList="nodownload noplaybackrate nofullscreen"
          autoPlay
          key={wordIndex}
        >
          <source
            src={`https://rslang-project1.herokuapp.com/${words[wordIndex].audio}`}
            type="audio/mp3"
          />
        </audio>
        <span>{words[wordIndex].word}</span> <span>{words[randomIndex].wordTranslate}</span>
        <button
          onClick={() => {
            {
              setWordIndex((current) => current + 1);
              setRandomIndex(randomizer(wordIndex + 1));
              onRightClick(wordIndex, randomIndex);
            }
          }}
        >
          Correct
        </button>
        <button
          onClick={() => {
            {
              setWordIndex((current) => current + 1);
              setRandomIndex(randomizer(wordIndex + 1));
              onWrongClick(wordIndex, randomIndex);
            }
          }}
        >
          Wrong
        </button>
      </div>
    </div>
  ) : (
    <h2>words ended</h2>
  );
}
