import React, { PropsWithChildren, useEffect, useState } from 'react';
import { contextFactory } from './helpers/contextFactory';
import storage from '../storage/storage';
import { SignInDTO } from '../api/apiCalls.types';

const [useAuthContext, AuthContext] = contextFactory<{
  auth: SignInDTO | null;
  setAuth: React.Dispatch<React.SetStateAction<SignInDTO | null>>;
}>();
export { useAuthContext };

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [auth, setAuth] = useState(storage.getItem<SignInDTO>('auth'));

  const values = {
    auth,
    setAuth,
  };

  useEffect(() => {
    storage.setItem('auth', auth);
  }, [JSON.stringify(auth)]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
