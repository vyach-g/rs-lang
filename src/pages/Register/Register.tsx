import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../../config/routes';

export default function Register() {
  return (
    <div>
      <div>Register</div>
      <p>
        Already have account?
        <Link to={RoutePaths.Login}>Log In</Link>
      </p>
    </div>
  );
}
