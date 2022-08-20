import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';

export default function SprintCard({
  count,
  words,
  setIsLastWord,
}: {
  count: number;
  words: Array<WordDTO>;
  setIsLastWord: Dispatch<SetStateAction<boolean>>;
}) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (wordIndex >= words.length) {
      setIsLastWord(true);
    }
  }, [wordIndex]);

  return wordIndex <= 19 ? (
    <div>
      <h3>{count}</h3>

      <div>
        <audio controls key={wordIndex}>
          <source
            src={`https://rslang-project1.herokuapp.com/${words[wordIndex].audio}`}
            type="audio/mp3"
          />
        </audio>
        <span>{words[wordIndex].word}</span> <span>{words[0].wordTranslate}</span>
        <button onClick={() => setWordIndex((current) => current + 1)}>Correct</button>
        <button>Wrong</button>
      </div>
    </div>
  ) : (
    <h2>words ended</h2>
  );
}
