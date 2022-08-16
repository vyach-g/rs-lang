import React from 'react';
import { Link } from 'react-router-dom';
import { signIn } from '../../api/apiCalls';
import { RoutePaths } from '../../config/routes';
import { useAuthContext } from '../../context/AuthContextProvider';

export default function Login() {
  const { setAuth } = useAuthContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    const credentials = {
      email: target.email.value,
      password: target.password.value,
    };

    const response = await signIn(credentials);
    setAuth(response?.data);
  }

  return (
    <div>
      <div>Login</div>
      <p>
        Dont have account?
        <Link to={RoutePaths.Register}>Register</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          email
          <input type="email" id="email" />
        </label>

        <label>
          password
          <input type="password" id="password" />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
