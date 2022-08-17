import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { Default } from '../../components/layout';

const Entry = () => {
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
        I am the entry page. <br />
        <Link to="/login">You should login first</Link>
      </div>
    </Default>
  );
};

export { Entry };
