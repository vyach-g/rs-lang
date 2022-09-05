import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Box, Stack } from '@mui/material';
import { Default } from '../../components/layout';
import {
  GameAction,
  GameButtonAudiocall,
  GameButtonSprint,
  GameButtonSavannah,
  GameName,
  Wrapper,
} from './Games.styles';

export default function Games() {
  return (
    <Wrapper>
      <Default>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ flexWrap: 'wrap', px: '20px', rowGap: '1rem' }}
        >
          <Box
            sx={{
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Link to="sprint" style={{ textDecoration: 'none' }}>
              <GameButtonSprint>
                <GameName>Спринт</GameName>
                <GameAction>Учит быстро переводить на ваш родной язык</GameAction>
              </GameButtonSprint>
            </Link>

            <Outlet />
          </Box>
          <Box
            sx={{
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Link to="audiocall" style={{ textDecoration: 'none' }}>
              <GameButtonAudiocall>
                <GameName>Аудиовызов</GameName>
                <GameAction>Улучшает восприятие речи на слух</GameAction>
              </GameButtonAudiocall>
            </Link>

            <Outlet />
          </Box>
          <Box
            sx={{
              height: '240px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <Link to="savannah" style={{ textDecoration: 'none' }}>
              <GameButtonSavannah>
                <GameName>Саванна</GameName>
                <GameAction>Развивает словарный запас</GameAction>
              </GameButtonSavannah>
            </Link>

            <Outlet />
          </Box>
        </Stack>
      </Default>
    </Wrapper>
  );
}
