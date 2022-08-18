import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from '../../../config/routes';

import { Entry, Login } from '../../../pages';
import { Registration } from '../../../pages';

const DefaultRoutes = () => {
  return (
    <Routes>
      <Route path={RoutePaths.Entry} element={<Entry />} />
      <Route path={RoutePaths.Login} element={<Login />} />
      <Route path={RoutePaths.Register} element={<Registration />} />
    </Routes>
  );
};

export { DefaultRoutes };
