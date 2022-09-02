import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';
import { Box, Container, Stack, Typography } from '@mui/material';
import {
  GameButtonSprint,
  GameName,
  GameAction,
  GameButtonAudiocall,
  GameButtonSavannah,
} from '../../../pages/Games/Games.styles';

export type ShowcaseProps = {
  group: number;
  page: number;
};

const Showcase: React.FC<ShowcaseProps> = (props) => {
  const navigate = useNavigate();
  const { group, page } = props;

  return (
    <Container sx={{ mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom={true}>
        Закрепите знания в играх
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
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
          <GameButtonSprint
            onClick={() =>
              navigate(`../games/${RoutePaths.SprintGame}`, { state: { group, page } })
            }
          >
            <GameName>Спринт</GameName>
            <GameAction>Учит быстро переводить на ваш родной язык</GameAction>
          </GameButtonSprint>
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
          <GameButtonAudiocall
            onClick={() =>
              navigate(`../games/${RoutePaths.AudioCallGame}`, { state: { group, page } })
            }
          >
            <GameName>Аудиовызов</GameName>
            <GameAction>Улучшает восприятие речи на слух</GameAction>
          </GameButtonAudiocall>
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
          <GameButtonSavannah
            onClick={() =>
              navigate(`../games/${RoutePaths.SavannahGame}`, { state: { group, page } })
            }
          >
            <GameName>Саванна</GameName>
            <GameAction>Развивает словарный запас.</GameAction>
          </GameButtonSavannah>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
};

export { Showcase };
