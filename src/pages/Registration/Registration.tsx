import React from 'react';

import { Link } from 'react-router-dom';
import { RoutePaths } from '../../config/routes';

import { Button, Stack, Typography, FormControl, Input, InputLabel, Box } from '@mui/material';
import { createUser } from '../../api/apiCalls';

const Registration = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const credentials = {
      name: target.username.value,
      email: target.email.value,
      password: target.password.value,
    };

    const response = await createUser(credentials);
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
      <Typography variant="h2">Registration</Typography>
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl variant="standard">
            <InputLabel htmlFor="username">Name</InputLabel>
            <Input id="username" type="text" />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" />
          </FormControl>

          <FormControl variant="standard">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" />
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
    </Box>
  );
};

export { Registration };
