import React from 'react';

import AuthContextProvider from './context/AuthContextProvider';
import { DefaultRoutes } from './components/routing';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Gilroy-Regular',
      'Nunito',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <DefaultRoutes />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
