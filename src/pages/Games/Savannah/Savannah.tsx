import { Box } from '@mui/material';
import React, { useState } from 'react';

const Savannah = () => {
  const [isGameStarted, setGameIsStarted] = useState(false);

  return <Box></Box>;
};

export { Savannah };

/**
 * Savannah form + start on form submit
 * Savannah Controls
 * 4 Перевода слова, на каждом висит листенер на нажатие ресет всех слов и
 * триггер определенной анимации, в зависимости от успеха / провала
 * Также useMemo / useState - хранит слова, на которые ответил пользователь
 * Есть жизни пользователя, по их окончанию кончается и игра,
 * Всплывает попап, который предлагает сыграть заного и дает статистику,
 * В controls также передается callback, который ставит стейт идущей игры в false
 */
