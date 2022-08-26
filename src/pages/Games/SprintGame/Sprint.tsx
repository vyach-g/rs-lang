import React, { useEffect, useState, useRef, createRef, LegacyRef } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';
import {
  AudioIcon,
  BackButton,
  BoldWord,
  ContentHeader,
  ContentResults,
  OneWord,
  ResultsHeader,
  ResultsHeaderULCorrect,
  ResultsHeaderULWrong,
  ResultsWords,
  SubmitButton,
} from './Sprint.styles';
import SprintCard from './SprintCard';
import icosound from '../../../assets/ico-sound.svg';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';

export default function Sprint({
  isFinish,
  words,

  setIsGameStarted,
}: {
  isFinish: boolean;
  words: Array<WordDTO>;

  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

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

  const wrongRefs = useRef(new Array(wordResults.filter((word) => word.status === 'wrong').length));

  const correctRefs = useRef(
    new Array(wordResults.filter((word) => word.status === 'correct').length)
  );
  return (
    <div>
      {isFinish || isLastWord ? (
        <ContentResults>
          <ContentHeader>Твой результат: {score} очков</ContentHeader>
          <ResultsWords>
            <ResultsHeader>
              Ошибок{' '}
              <ResultsHeaderULWrong>
                {wordResults.filter((word) => word.status === 'wrong').length}
              </ResultsHeaderULWrong>
            </ResultsHeader>
            {wordResults
              .filter((word) => word.status === 'wrong')
              .map((word, idx) => (
                <OneWord key={word.id}>
                  <AudioIcon src={icosound} onClick={() => wrongRefs.current[idx].play()} />
                  <audio ref={(el) => (wrongRefs.current[idx] = el)}>
                    <source
                      src={`https://rslang-project1.herokuapp.com/${word.audio}`}
                      type="audio/mp3"
                    />
                  </audio>
                  <span>
                    <BoldWord>{word.word}</BoldWord> - {word.wordTranslate}
                  </span>
                </OneWord>
              ))}{' '}
            <ResultsHeader>
              Знаю{' '}
              <ResultsHeaderULCorrect>
                {wordResults.filter((word) => word.status === 'correct').length}
              </ResultsHeaderULCorrect>
            </ResultsHeader>
            {wordResults
              .filter((word) => word.status === 'correct')
              .map((word, idx) => (
                <OneWord key={word.id}>
                  <AudioIcon src={icosound} onClick={() => correctRefs.current[idx].play()} />
                  <audio ref={(el) => (correctRefs.current[idx] = el)}>
                    <source
                      src={`https://rslang-project1.herokuapp.com/${word.audio}`}
                      type="audio/mp3"
                    />
                  </audio>
                  <span>
                    <BoldWord>{word.word}</BoldWord> - {word.wordTranslate}
                  </span>
                </OneWord>
              ))}
          </ResultsWords>

          <SubmitButton
            onClick={() => {
              setIsLastWord(false), setIsGameStarted(false);
            }}
          >
            Продолжить тренировку
          </SubmitButton>
          <BackButton onClick={() => navigate(RoutePaths.Games)}>К списку тренировок</BackButton>
        </ContentResults>
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
          />
        </>
      )}
    </div>
  );
}
