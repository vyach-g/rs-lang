import React from 'react';
import { WordDTO } from '../../../api/apiCalls.types';

export default function SprintCard({ count, words }: { count: number; words: Array<WordDTO> }) {
  return (
    <div>
      <h3>{count}</h3>

      <div>
        <audio controls>
          <source
            src={`https://rslang-project1.herokuapp.com/${words[0].audio}`}
            type="audio/mp3"
          />
        </audio>
        <span>{words[0].word}</span> <span>{words[0].wordTranslate}</span>
        <button>Correct</button>
        <button>Wrong</button>
      </div>
    </div>
  );
}
