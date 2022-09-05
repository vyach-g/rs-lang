import { createContext, useContext } from 'react';

export const contextFactory = <A extends unknown | null>() => {
  const context = createContext<A | undefined>(undefined);

  const useAuthContext = () => {
    const ctx = useContext(context);

    if (ctx === undefined) {
      throw new Error('useContext must be used inside of a Provider with a value.');
    }

    return ctx;
  };

  return [useAuthContext, context] as const;
};
