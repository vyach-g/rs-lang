import React, { useState, useEffect, useRef } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';

const STATUS = {
  STARTED: 'STARTED',
  STOPPED: 'STOPPED',
};

const INITIAL_COUNT = 10;

interface Props {
  triggerReset: WordDTO | undefined;
  onCountZero: () => void;
}

const CountDown: React.FC<Props> = ({ triggerReset, onCountZero }) => {
  const [currCount, setCurrCount] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STARTED);
  ~useEffect(() => {
    setCurrCount(INITIAL_COUNT);
  }, [triggerReset]);

  useInterval(
    () => {
      if (currCount > 0) {
        setCurrCount(currCount - 1);
      } else {
        onCountZero();
        setCurrCount(INITIAL_COUNT);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <div className="App">
      <div style={{ padding: 20 }}>{currCount}</div>
    </div>
  );
};

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback);

  if (!callback) return;

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export { CountDown };

// const twoDigits = (num) => String(num).padStart(2, '0');
