import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
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
      Register and log in<Link to="/login">Login</Link>
    </div>
  );
};

export { RegistrationPage };
