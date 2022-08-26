import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';
import { AudioIcon } from './Sprint.styles';
import icosound from '../../../assets/ico-sound.svg';

function randomizer(wordIndex: number) {
  return Math.random() - 0.6 < 0 ? wordIndex : Math.floor(Math.random() * 19);
}

export default function SprintCard({
  words,
  setIsLastWord,
  onRightClick,
  onWrongClick,
}: {
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

  const audioRefs = useRef(new Array(words.length));

  return wordIndex <= 19 ? (
    <div>
      <div>
        <AudioIcon src={icosound} onClick={() => audioRefs.current[wordIndex].play()} />
        <audio key={wordIndex} ref={(el) => (audioRefs.current[wordIndex] = el)}>
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
