import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, Stack, Typography } from '@mui/material';
import { GameName, GameAction } from '../../../pages/Games/Games.styles';
import { gameData } from './showcaseInfo';

export type ShowcaseProps = {
  group: number;
  page: number;
  currentPageLearned: boolean;
};

const Showcase: React.FC<ShowcaseProps> = ({ group, page, currentPageLearned }) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mb: 5 }}>
      <Typography variant="h4" align="center" gutterBottom={true}>
        Закрепите знания в играх
      </Typography>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          filter: currentPageLearned ? 'grayscale(100%)' : '',
          transition: 'all 0.3s',
          flexWrap: 'wrap',
          px: '20px',
          rowGap: '1rem',
        }}
      >
        {gameData.map((game) => {
          return (
            <Box
              key={game.type}
              sx={{
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <game.button
                onClick={() => {
                  if (!currentPageLearned) {
                    navigate(game.path, { state: { group, page } });
                  }
                }}
              >
                <GameName>{game.name}</GameName>
                <GameAction>{game.desc}</GameAction>
              </game.button>
              <Outlet />
            </Box>
          );
        })}
      </Stack>
    </Container>
  );
};

export { Showcase };
