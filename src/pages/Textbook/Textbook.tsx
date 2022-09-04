import React, { useState } from 'react';

import { Default } from '../../components/layout';
import { WordList } from '../../components/modules';
import { Showcase } from '../../components/modules';
import storage from '../../storage/storage';
import { TextbookGroup } from '../../components/modules/WordList/wordListConsts';

const Textbook = () => {
  const [group, setGroup] = useState(storage.getItem('textbookGroup') || 0);
  const [page, setPage] = useState(storage.getItem('textbookPage') || 0);
  const [currentPageLearned, setCurrentPageLearned] = useState<boolean>(false);

  return (
    <Default>
      <WordList
        group={group}
        setGroup={setGroup}
        page={page}
        setPage={setPage}
        currentPageLearned={currentPageLearned}
        setCurrentPageLearned={setCurrentPageLearned}
      />
      {group !== TextbookGroup.Hard && (
        <Showcase group={group} page={page} currentPageLearned={currentPageLearned} />
      )}
    </Default>
  );
};

export { Textbook };
