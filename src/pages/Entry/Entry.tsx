import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { SignInDTO } from '../../api/apiCalls.types';
import { Default } from '../../components/layout';
import storage from '../../storage/storage';

const Entry = () => {
  let greeting;

  if (storage.getItem('auth')) {
    const userName = storage.getItem<SignInDTO>('auth')?.name;
    greeting = `Hello ${userName}`;
  } else {
    greeting = (
      <>
        I am the entry page. <br />
        <Link to="/login">You should login first</Link>
      </>
    );
  }

  return (
    <Default>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          height: '95vh',
        }}
      >
        {greeting}
      </div>
      <div>
        <Link to="/games">Games</Link>
      </div>
    </Default>
  );
};

export { Entry };
