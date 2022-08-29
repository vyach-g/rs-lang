import { Box } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { WordDTO } from '../../../api/apiCalls.types';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const INITIAL_COUNT = 120;

interface Props {
  onCountZero: () => void;
}

const CountDown: React.FC<Props> = ({ onCountZero }) => {
  const [currCount, setCurrCount] = useState(INITIAL_COUNT);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      if (currCount > 0) {
        setCurrCount(currCount - 1);
      } else {
        onCountZero();
        setCurrCount(INITIAL_COUNT);
      }
    },
    isRunning ? 1000 : null
  );

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        color: 'rgba(250,211,207,1)',
        right: '2rem',
        top: '2rem',
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
