import React from 'react';
import './App.css';
import Pages from './pages/Pages';
import AuthContextProvider from './context/AuthContextProvider';

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Pages />
      </div>
    </AuthContextProvider>
  );
}

export default App;
