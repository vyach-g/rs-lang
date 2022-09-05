import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { styled } from '@mui/material/styles';

import { Typography } from '@mui/material';

import CoverImage from '../../../assets/test6.jpg';

const AboutCustom = styled('section')(({ theme }) => ({
  display: 'block',
  width: '100%',
}));

const AboutContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  rowGap: '1.2rem',
  paddingInline: '24px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const AboutHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  color: 'inherit',
  fontWeight: '600',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
  },
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'inherit',
  fontWeight: '400',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const PlayerRelativeWrapper = styled('div')(({ theme }) => ({
  maxWidth: '940px',
  width: '100%',
  height: 'auto',
  [theme.breakpoints.down('md')]: {
    maxWidth: '700px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '540px',
    padding: '1.5rem 0',
  },
}));

type DivProps = {
  isPlaying: boolean;
};

const PlayerWrapper = styled('div')<DivProps>(({ isPlaying }) => ({
  position: 'relative',
  paddingTop: '56%',
  '& .react-player__preview': {
    width: '84% !important',
    height: '94% !important',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  '& .react-player__shadow': {
    background: 'none !important',
  },
  '& .react-player__play-icon': {
    borderWidth: '24px 0 24px 40px !important',
    marginLeft: '12px !important',
    transition: '.25s ease !important',
  },
  '&:hover': {
    '& .react-player__play-icon': {
      borderLeftColor: 'black !important',
    },
  },
  '& > div': {
    ...(isPlaying && {
      position: 'absolute',
      top: '0',
      left: '50%',
      transform: 'translate(-50%, 0)',
    }),
  },
}));

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayer = () => {
    setIsPlaying(true);
  };

  return (
    <AboutCustom>
      <AboutContainer>
        <AboutHeading>С чего Начать?</AboutHeading>
        <AboutDescription>
          Посмотри ознакомительное видео
          <br /> Начни свой путь в изучении английского языка
        </AboutDescription>
        <PlayerRelativeWrapper>
          <PlayerWrapper onClick={handlePlayer} isPlaying={isPlaying}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=tj5oJip3HqU"
              playing
              controls
              light={CoverImage}
              width="100%"
              height="100%"
            />
          </PlayerWrapper>
        </PlayerRelativeWrapper>
      </AboutContainer>
    </AboutCustom>
  );
};

export { About };
