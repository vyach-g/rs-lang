import React, { useState } from 'react';

import { Box, Typography, Tabs, Tab, Button } from '@mui/material';

import { Link, useLocation, useNavigate } from 'react-router-dom';

interface Props {
  onNextGame: () => void;
}

const Router: React.FC<Props> = ({ onNextGame }) => {
  const [currTab, setCurrTab] = React.useState('one');
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrTab(newTab);
  };

  const handleNewGame = (event: React.MouseEvent) => {
    onNextGame();
    // navigate(location.pathname);
  };

  return (
    <Box>
      <Box>Слова</Box>
      <Button onClick={handleNewGame}>Сыграть ещё</Button>
    </Box>
  );
};

export { Router };
