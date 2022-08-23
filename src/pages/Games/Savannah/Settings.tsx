import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { callbackify } from 'util';

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
        }}
      >
        <FormLabel id="demo-radio-buttons-group-label">
          <Typography variant="h5">Выбери Сложность Игры</Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="game difficulty"
          defaultValue="A1"
          name="game difficulty"
          onChange={onSettingChange}
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          <FormControlLabel value="A1" control={<Radio />} label="A1" />
          <FormControlLabel value="A2" control={<Radio />} label="A2" />
          <FormControlLabel value="B1" control={<Radio />} label="B1" />
          <FormControlLabel value="B2" control={<Radio />} label="B2" />
          <FormControlLabel value="C1" control={<Radio />} label="C1" />
          <FormControlLabel value="C2" control={<Radio />} label="C2" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        type="submit"
        sx={{ display: 'block', maxWidth: '220px', width: '100%', marginInline: 'auto' }}
      >
        Start the game
      </Button>
    </form>
  );
};

export { Settings };
