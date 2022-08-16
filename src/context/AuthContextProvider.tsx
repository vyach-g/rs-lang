import React, { PropsWithChildren, useEffect, useState } from 'react';
import { contextFactory } from './helpers/contextFactory';
import storage from '../storage/storage';

export type AuthData = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

const [useAuthContext, AuthContext] = contextFactory<{
  auth: AuthData | null;
  setAuth: React.Dispatch<React.SetStateAction<AuthData | null>>;
}>();
export { useAuthContext };

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState(storage.getItem<AuthData>('auth'));

  const values = {
    auth,
    setAuth,
  };

  useEffect(() => {
    storage.setItem('auth', auth);
  }, [JSON.stringify(auth)]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
