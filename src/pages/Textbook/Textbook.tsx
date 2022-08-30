import React, { useState } from 'react';

import { Default } from '../../components/layout';
import { WordList } from '../../components/modules';
import { Showcase } from '../../components/modules';
import storage from '../../storage/storage';

const Textbook = () => {
  const [group, setGroup] = useState(storage.getItem('textbookGroup') || 1);
  const [page, setPage] = useState(storage.getItem('textbookPage') || 1);

  return (
    <Default>
      <WordList group={group} setGroup={setGroup} page={page} setPage={setPage} />
      <Showcase group={group} page={page} />
    </Default>
  );
};

export { Textbook };
