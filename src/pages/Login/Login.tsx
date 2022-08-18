import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { signIn } from '../../api/apiCalls';
import { RoutePaths } from '../../config/routes';
import { useAuthContext } from '../../context/AuthContextProvider';

import {
  Button,
  Alert,
  Stack,
  Typography,
  FormControl,
  Input,
  InputLabel,
  Box,
  Snackbar,
} from '@mui/material';
import { withAsync } from '../../api/helpers/withAsync';

const Login = () => {
  const { setAuth } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErrorMsg('');
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const credentials = {
      email: target.email.value,
      password: target.password.value,
    };

    const { response, error } = await withAsync(() => signIn(credentials));
    if (error) {
      if (error instanceof Error) {
        setErrorMsg(error.response.data);
      }
    } else if (response) {
      setAuth(response?.data);
    }
  };

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
      <Typography variant="h2">Login</Typography>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" />
          </FormControl>
          <Button variant="contained" type="submit" sx={{ mt: '1rem' }}>
            Login
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
        {"Don't have an account?"} <br />
        <Link to={RoutePaths.Register}>Register</Link>
      </Box>
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
    </Box>
  );
};

export { Login };
