import React, { useRef } from 'react';

import { IconButton, ListItem } from '@mui/material';

import VolumeDownIcon from '@mui/icons-material/VolumeDown';

import { WordDTO } from '../../../api/apiCalls.types';

interface Props {
  answer?: WordDTO;
}

const GameWordCard: React.FC<Props> = ({ answer }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudio = () => {
    audioRef.current?.play();
  };

  return (
    <ListItem sx={{ cursor: 'pointer', padding: '0', columnGap: '0.5rem' }}>
      <IconButton sx={{ color: 'black', marginTop: '0.25rem' }} onClick={handleAudio}>
        <VolumeDownIcon />
      </IconButton>
      <audio ref={audioRef}>
        <source src={`https://rslang-project1.herokuapp.com/${answer?.audio}`} type="audio/mp3" />
      </audio>
      {answer?.word}
    </ListItem>
  );
};

export { GameWordCard };
