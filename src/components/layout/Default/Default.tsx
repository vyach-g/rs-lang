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
      <main>{children}</main>
      <Divider />
      <Footer />
    </>
  );
};

export { Default };
