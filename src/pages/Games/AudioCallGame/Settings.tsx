import React, { useEffect, useState } from 'react';

import { FormControl, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { ShowcaseProps } from '../../../components/modules/Showcase/Showcase';

const ButtonSubmit = styled('button')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '3px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgb(255, 222, 222)',
  fontWeight: '600',
  fontSize: '1.2rem',
  letterSpacing: '0.1rem',
  textTransform: 'uppercase',
  cursor: 'pointer',
  marginTop: '1rem',
  '&::after': {
    content: '""',
    display: 'block',
    marginTop: '0.5rem',
    width: '0.8rem',
    height: '2.5px',
    background: '#d5c3d6',
    transition: 'width .25s',
  },
  '&:hover::after': {
    width: '100%',
    background: 'rgb(255, 222, 222)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    '&::after': {
      marginTop: '0.3rem',
    },
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

const ButtonCustom = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  borderRadius: '3px',
  border: '2px solid rgba(245, 232, 199, 0.15);',
  backgroundColor: 'transparent',
  color: 'rgb(255, 222, 222)',
  padding: '.5rem 2.5rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.25s ease',
  '&:hover': {
    borderWidth: '2px',
    color: 'rgb(194, 16, 16)',
    backgroundColor: 'rgb(255, 222, 222)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const ButtonsGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const Aliases: { [key: string]: number } = {
  A1: 0,
  A2: 1,
  B1: 2,
  B2: 3,
  C1: 4,
  C2: 5,
};

interface Props {
  onGameStart: (arg: number) => void;
}

const Settings: React.FC<Props> = ({ onGameStart }) => {
  const [difficulty, setDifficulty] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      const { group } = state as ShowcaseProps;
      onGameStart(Aliases[group]);
    }
  }, []);

  const onSettingChange = (event: React.MouseEvent) => {
    const targetedEl = event.target as HTMLButtonElement;
    setDifficulty(Aliases[targetedEl.innerText]);
  };

  const onSettingsSubmit = () => {
    onGameStart(difficulty);
  };

  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '1rem',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'rgb(255, 222, 222)',
          textTransform: 'uppercase',
          fontSize: ['1.3rem', '1.5rem', '1.8rem'],
          textAlign: 'center',
        }}
      >
        Выбери cложность <span style={{ color: '#d5c3d6' }}>игры</span>
      </Typography>
      <ButtonsGroup>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === 0 ? { background: '#d5c3d6', color: 'rgb(194, 16, 16)' } : {}}
        >
          A1
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === 1 ? { background: '#d5c3d6', color: 'rgb(194, 16, 16)' } : {}}
        >
          A2
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === 2 ? { background: '#d5c3d6', color: 'rgb(194, 16, 16)' } : {}}
        >
          B1
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === 3 ? { background: '#d5c3d6', color: 'rgb(194, 16, 16)' } : {}}
        >
          B2
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === 4 ? { background: '#d5c3d6', color: 'rgb(194, 16, 16)' } : {}}
        >
          C1
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === 5 ? { background: '#d5c3d6', color: 'rgb(194, 16, 16)' } : {}}
        >
          C2
        </ButtonCustom>
      </ButtonsGroup>
      <ButtonSubmit onClick={onSettingsSubmit}>Начни Игру</ButtonSubmit>
    </FormControl>
  );
};

export { Settings };
