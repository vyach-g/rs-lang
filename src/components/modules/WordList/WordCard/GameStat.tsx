import React from 'react';
import { Box, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';

type GameStatProps = {
  gameName: string;
  right: number;
  wrong: number;
};

const GameStat: React.FC<GameStatProps> = ({ gameName, right, wrong }) => {
  return (
    <Box sx={{ mb: 0.25 }}>
      <Typography align="center" variant="body2" sx={{ color: 'text.secondary' }}>
        {gameName}
      </Typography>
      <Typography align="center" variant="body1">
        <Box component="span" sx={{ color: green[500] }}>
          {right}
        </Box>
        /
        <Box component="span" sx={{ color: red[500] }}>
          {wrong}
        </Box>
      </Typography>
    </Box>
  );
};

export { GameStat };
