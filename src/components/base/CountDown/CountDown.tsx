import { Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const INITIAL_COUNT = 15;

interface Props {
  onCountZero: () => void;
  resetOnChange?: number;
}

const CountDown: React.FC<Props> = ({ onCountZero, resetOnChange }) => {
  const [currCount, setCurrCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    setCurrCount(INITIAL_COUNT);
  }, [resetOnChange]);

  useInterval(() => {
    if (currCount > 0) {
      setCurrCount(currCount - 1);
    } else {
      onCountZero();
    }
  }, 1000);

  return (
    <Box
      sx={{
        position: 'absolute',
        color: 'rgba(250,211,207,1)',
        right: '2rem',
        top: '1.5rem',
        fontSize: '2rem',
        cursor: 'pointer',
        '& :hover': {
          color: '#C6B4CE',
        },
      }}
    >
      <div>{currCount}</div>
    </Box>
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
