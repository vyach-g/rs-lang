import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {`Don't have an account?`}
      <Link to="/register">Register</Link>
      <Link to="/">Login</Link>
    </div>
  );
};

export { LoginPage };
