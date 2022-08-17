import React from 'react';

import { Link } from 'react-router-dom';

import { signIn } from '../../api/apiCalls';
import { RoutePaths } from '../../config/routes';
import { useAuthContext } from '../../context/AuthContextProvider';

import { Button, Stack, Typography, FormControl, Input, InputLabel, Box } from '@mui/material';

const Login = () => {
  const { setAuth } = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const credentials = {
      email: target.email.value,
      password: target.password.value,
    };

    const response = await signIn(credentials);
    setAuth(response?.data);
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
          flexDirection: 'column',
          alignItems: 'center',
          pt: '1rem',
          gap: '1rem',
        }}
      >
        {"Don't have an account?"} <br />
        <Link to={RoutePaths.Register}>
          <Button variant="contained">Register</Button>
        </Link>
      </Box>
    </Box>
  );
};

export { Login };
