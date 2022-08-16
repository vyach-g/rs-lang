import React from 'react';
import { Default } from './components/layout';
import { EntryPage, LoginPage, RegistrationPage } from './components/pages';
import { Routes, Route, Link } from 'react-router-dom';
import { RoutePats } from './config/routes';

function App() {
  return (
    <Routes>
      {/* prettier-ignore */}
      <Route path={RoutePats.Entry} element={<Default><EntryPage/></Default>} />
      <Route path={RoutePats.Login} element={<LoginPage />} />
      <Route path={RoutePats.Register} element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
