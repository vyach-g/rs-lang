import { RoutePaths } from '../../../config/routes';
import {
  GameButtonSprint,
  GameButtonAudiocall,
  GameButtonSavannah,
} from '../../../pages/Games/Games.styles';

const gameData = [
  {
    type: 'sprint',
    name: 'Спринт',
    desc: 'Учит быстро переводить на ваш родной язык',
    path: `../games/${RoutePaths.SprintGame}`,
    button: GameButtonSprint,
  },
  {
    type: 'audiocall',
    name: 'Аудиовызов',
    desc: 'Улучшает восприятие речи на слух',
    path: `../games/${RoutePaths.AudioCallGame}`,
    button: GameButtonAudiocall,
  },
  {
    type: 'savannah',
    name: 'Саванна',
    desc: 'Развивает словарный запас',
    path: `../games/${RoutePaths.SavannahGame}`,
    button: GameButtonSavannah,
  },
];

export { gameData };
