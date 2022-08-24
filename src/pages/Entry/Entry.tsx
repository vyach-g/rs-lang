import React from 'react';

import { Default } from '../../components/layout';

import { About, Billboard, Crew } from '../../components/modules';

const Entry = () => {
  return (
    <Default>
      <Billboard />
      <About />
      <Crew />
    </Default>
  );
};

export { Entry };
