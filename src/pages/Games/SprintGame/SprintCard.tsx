import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';
import {
  AudioIcon,
  Content,
  GreenButton,
  HeaderText,
  RedButton,
  TransparentText,
} from './Sprint.styles';
import icosound from '../../../assets/ico-sound.svg';
import { Stack } from '@mui/material';

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
      <Content>
        <Stack direction="row" spacing={2}>
          <HeaderText>{words[wordIndex].word}</HeaderText>
          <AudioIcon src={icosound} onClick={() => audioRefs.current[wordIndex].play()} />
          <audio key={wordIndex} ref={(el) => (audioRefs.current[wordIndex] = el)}>
            <source
              src={`https://rslang-project1.herokuapp.com/${words[wordIndex].audio}`}
              type="audio/mp3"
            />
          </audio>
        </Stack>
        <TransparentText>{words[randomIndex].wordTranslate}</TransparentText>
        <Stack direction="row" spacing={2}>
          <RedButton
            onClick={() => {
              {
                setWordIndex((current) => current + 1);
                setRandomIndex(randomizer(wordIndex + 1));
                onWrongClick(wordIndex, randomIndex);
              }
            }}
          >
            ← Неверно
          </RedButton>
          <GreenButton
            onClick={() => {
              {
                setWordIndex((current) => current + 1);
                setRandomIndex(randomizer(wordIndex + 1));
                onRightClick(wordIndex, randomIndex);
              }
            }}
          >
            Верно →
          </GreenButton>
        </Stack>
      </Content>
    </div>
  ) : (
    <h2>words ended</h2>
  );
}
