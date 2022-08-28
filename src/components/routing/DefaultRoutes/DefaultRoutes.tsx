import React from 'react';

import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';
import { useAuthContext } from '../../../context/AuthContextProvider';

import { Entry, Login, Statistics, Registration } from '../../../pages';
import Games from '../../../pages/Games/Games';
import AudioCallGame from '../../../pages/Games/AudioCallGame/AudioCallGame';
import SprintGame from '../../../pages/Games/SprintGame/SprintGame';
import { Textbook } from '../../../pages/Textbook/Textbook';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { auth: isAuth } = useAuthContext();
  const { pathname } = useLocation();

  return isAuth ? <>{children}</> : <Navigate to="/login" replace state={{ path: pathname }} />;
};

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
      <Route
        path={RoutePaths.Statistics}
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />
      <Route path={RoutePaths.Textbook} element={<Textbook />} />
    </Routes>
  );
};

export { DefaultRoutes };
