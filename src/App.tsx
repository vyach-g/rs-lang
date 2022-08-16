import React from 'react';

import AuthContextProvider from './context/AuthContextProvider';
import { DefaultRoutes } from './components/routing';

function App() {
  return (
    <AuthContextProvider>
      <DefaultRoutes />
    </AuthContextProvider>
  );
}

export default App;
