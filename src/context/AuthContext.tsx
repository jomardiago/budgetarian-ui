import React, { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode';

export type User = {
  _id: string;
  email: string;
  username: string;
};

export type AuthContextValue = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  logout: () => void;
  login: (cb: () => void) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  setUser: () => {},
  logout: () => {},
  login: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

let decodedToken: User | undefined = undefined;
if (localStorage.getItem('token')) {
  decodedToken = jwtDecode(localStorage.getItem('token') || '');
}

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User | undefined>(decodedToken || undefined);

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem('token');
  };

  const login = (cb: () => void) => {
    if (localStorage.getItem('token')) {
      const decodedToken: User = jwtDecode(localStorage.getItem('token') || '');
      setUser(decodedToken);
      cb();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
