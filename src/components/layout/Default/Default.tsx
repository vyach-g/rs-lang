import React from 'react';
import { Footer, Header } from '../../modules';

interface Props {
  children: React.ReactNode;
}

const Default: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export { Default };
