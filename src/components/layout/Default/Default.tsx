import React from 'react';
import { Footer, Header } from '../../modules';

import { Divider } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: 'calc(100vh - 203px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </main>
      <Divider />
      <Footer />
    </>
  );
};

export { Default };
