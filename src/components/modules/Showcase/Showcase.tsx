import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';
import { Box, Container, Typography } from '@mui/material';

export type ShowcaseProps = {
  group: number;
  page: number;
};

const Showcase: React.FC<ShowcaseProps> = (props) => {
  const navigate = useNavigate();
  const { group, page } = props;

  return (
    <Container>
      <Typography variant="h4" align="center">
        Закрепите знания в играх
        <Box>
          <button
            onClick={() =>
              navigate(`../games/${RoutePaths.SprintGame}`, { state: { group, page } })
            }
          >
            Спринт
          </button>
          <Link to={RoutePaths.AudioCallGame}>Аудиовызов</Link>
        </Box>
      </Typography>
    </Container>
  );
};

export { Showcase };
