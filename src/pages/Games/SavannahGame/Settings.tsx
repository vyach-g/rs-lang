import React, { useState } from 'react';

import { FormControl, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

const ButtonSubmit = styled('button')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '3px',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'rgba(250,211,207,1)',
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
    height: '2px',
    background: '#C6B4CE',
    transition: 'width .25s',
  },
  '&:hover::after': {
    width: '100%',
    background: 'rgba(250,211,207,1)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const ButtonCustom = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  justifyContent: 'center',
  borderRadius: '3px',
  border: '2px solid rgba(250,211,207,0.2)',
  backgroundColor: 'transparent',
  color: 'rgba(250,211,207,1)',
  padding: '.5rem 2.5rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: '0.25s ease',
  '&:hover': {
    borderWidth: '2px',
    color: 'black',
    backgroundColor: 'rgba(250,211,207, 1)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const ButtonsGroup = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
});

const Aliases: { [key: string]: string } = {
  A1: '0',
  A2: '1',
  B1: '2',
  B2: '3',
  C1: '4',
  C2: '5',
};

interface Props {
  onGameStart: (arg: string) => void;
}

const Settings: React.FC<Props> = ({ onGameStart }) => {
  const [difficulty, setDifficulty] = useState('0');

  const onSettingChange = (event: React.MouseEvent) => {
    const langLevel = (event.target as HTMLButtonElement).innerText;
    setDifficulty(Aliases[langLevel]);
  };

  const onSettingsSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
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
        sx={{ color: 'rgba(250,211,207, 1)', textTransform: 'uppercase', fontSize: '1.8rem' }}
      >
        Выбери cложность <span style={{ color: '#C6B4CE' }}>игры</span>
      </Typography>
      <ButtonsGroup>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === '0' ? { background: '#C6B4CE', color: 'black' } : {}}
        >
          A1
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === '1' ? { background: '#C6B4CE', color: 'black' } : {}}
        >
          A2
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === '2' ? { background: '#C6B4CE', color: 'black' } : {}}
        >
          B1
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === '3' ? { background: '#C6B4CE', color: 'black' } : {}}
        >
          B2
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === '4' ? { background: '#C6B4CE', color: 'black' } : {}}
        >
          C1
        </ButtonCustom>
        <ButtonCustom
          onClick={onSettingChange}
          style={difficulty === '5' ? { background: '#C6B4CE', color: 'black' } : {}}
        >
          C2
        </ButtonCustom>
      </ButtonsGroup>
      <ButtonSubmit onClick={onSettingsSubmit}>Начни Игру</ButtonSubmit>
    </FormControl>
  );
};

export { Settings };
