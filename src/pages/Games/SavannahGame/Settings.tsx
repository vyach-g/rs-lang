import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { styled } from '@mui/material/styles';

const RadioCustom = styled(Radio)({
  color: 'black',
  '&.Mui-checked': {
    color: '#ff4d4d',
  },
});

const ButtonCustom = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  fontWeight: '600',
  borderRadius: '3px',
  borderWidth: '2px',
  borderColor: 'black',
  color: 'black',
  marginTop: '1rem',
  padding: '.3rem 2rem',
  width: '100%',
  '&:hover': {
    borderColor: 'black',
    borderWidth: '2px',
    backgroundColor: '#ff4d4d',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

interface Props {
  onGameStart: (arg: string) => void;
}

const Settings: React.FC<Props> = ({ onGameStart }) => {
  const [difficulty, setDifficulty] = useState('0');

  const onSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDifficulty(event.target.value);
  };

  const onSettingsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onGameStart(difficulty);
  };

  return (
    <form onSubmit={onSettingsSubmit}>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '1rem',
        }}
      >
        <Typography variant="h5">Выбери cложность игры</Typography>
        <RadioGroup
          aria-labelledby="game difficulty"
          defaultValue="0"
          name="game difficulty"
          onChange={onSettingChange}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel value="0" control={<RadioCustom />} label="A1" />
          <FormControlLabel value="1" control={<RadioCustom />} label="A2" />
          <FormControlLabel value="2" control={<RadioCustom />} label="B1" />
          <FormControlLabel value="3" control={<RadioCustom />} label="B2" />
          <FormControlLabel value="4" control={<RadioCustom />} label="C1" />
          <FormControlLabel value="5" control={<RadioCustom />} label="C2" />
        </RadioGroup>
      </FormControl>
      <ButtonCustom variant="outlined" type="submit">
        Start the game
      </ButtonCustom>
    </form>
  );
};

export { Settings };
