import React from 'react';

import { Default } from '../../components/layout';
import { WordList } from '../../components/modules';
import { Showcase } from '../../components/modules';

const Textbook = () => {
  return (
    <Default>
      <WordList></WordList>
      <Showcase></Showcase>
    </Default>
  );
};

export { Textbook };
