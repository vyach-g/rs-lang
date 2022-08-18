import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../config/routes';

import {
  Button,
  Stack,
  Snackbar,
  Alert,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Box,
} from '@mui/material';
import { createUser } from '../../api/apiCalls';
import { withAsync } from '../../api/helpers/withAsync';
import validator from 'validator';

const Registration = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<string>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg('');
    setRequestStatus('pending');
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const credentials = {
      name: target.username.value,
      email: target.email.value,
      password: target.password.value,
    };

    if (credentials.password.length < 8) {
      setErrorMsg('Придумайте пароль более 8 знаков');
      setRequestStatus('error');
      return;
    }
    if (!validator.isEmail(credentials.email)) {
      setErrorMsg('Введите правильный email');
      setRequestStatus('error');

      return;
    }
    const { response, error } = await withAsync(() => createUser(credentials));
    if (error) {
      if (error instanceof Error) {
        setErrorMsg(error.response.data);
      }
      setRequestStatus('error');
    } else if (response) {
      setRequestStatus('success');

      setTimeout(() => {
        return navigate('/login');
      }, 2000);
    }
  };

  let snackbar;
  if (requestStatus === 'error') {
    snackbar = (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={Boolean(errorMsg)}
        autoHideDuration={4000}
        onClose={() => setErrorMsg('')}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    );
  } else if (requestStatus === 'success') {
    snackbar = (
      <Snackbar
        open={requestStatus === 'success'}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Пользователь успешно зарегистрирован
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2">Registration</Typography>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl variant="standard">
            <InputLabel htmlFor="username">Name</InputLabel>
            <Input id="username" type="text" required />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" required />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" required />
          </FormControl>
          <Button variant="contained" type="submit" sx={{ mt: '1rem' }}>
            Register
          </Button>
        </Stack>
      </form>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '2rem',
          gap: '1rem',
        }}
      >
        Already have an account? <br />
        <Link to={RoutePaths.Login}>Login</Link>
      </Box>
      {snackbar}
    </Box>
  );
};

export { Registration };
