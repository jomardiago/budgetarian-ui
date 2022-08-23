import React, { createContext, useState } from 'react';

export type User = {
  _id: string;
  username: string;
};

export type AuthContextValue = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setUser: () => {},
  logout: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const userLocalStorage = JSON.parse(localStorage.getItem('user') || 'false') || undefined;

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User | undefined>(userLocalStorage ? userLocalStorage : undefined);

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
