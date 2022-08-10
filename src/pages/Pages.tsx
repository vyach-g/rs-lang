import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePaths } from '../config/routes';
import Login from './Login/Login';
import Register from './Register/Register';

export default function Pages() {
  return (
    <Routes>
      <Route path={RoutePaths.Register} element={<Register />} />
      <Route path={RoutePaths.Login} element={<Login />} />
    </Routes>
  );
}
