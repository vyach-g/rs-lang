import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';

import { Entry, Login } from '../../../pages';
import { Registration } from '../../../pages';
import AudioCallGame from '../../../pages/Games/AudioCallGame/AudioCallGame';
import Games from '../../../pages/Games/Games';
import SprintGame from '../../../pages/Games/SprintGame/SprintGame';

const DefaultRoutes = () => {
  return (
    <Routes>
      <Route path={RoutePaths.Entry} element={<Entry />} />
      <Route path={RoutePaths.Login} element={<Login />} />
      <Route path={RoutePaths.Register} element={<Registration />} />
      <Route path={RoutePaths.Games}>
        <Route index element={<Games />} />
        <Route path={RoutePaths.SprintGame} element={<SprintGame />} />
        <Route path={RoutePaths.AudioCallGame} element={<AudioCallGame />} />
      </Route>
    </Routes>
  );
};

export { DefaultRoutes };
