import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../config/routes';

export default function Login() {
  return (
    <div>
      <div>Login</div>
      <p>
        Dont have account?
        <Link to={RoutePaths.Register}>Register</Link>
      </p>
    </div>
  );
}
