import api from '../api';

export type User = {
  _id?: string;
  email: string;
  username: string;
  password?: string;
};

export const registerUser = (user: Omit<User, '_id'>) =>
  api.post<{ token: string; user: { _id: string; email: string; username: string } }>('users/register', user);

export const loginUser = (user: { username: string; password: string }) =>
  api.post<{ token: string; user: { _id: string; email: string; username: string } }>('users/login', user);
