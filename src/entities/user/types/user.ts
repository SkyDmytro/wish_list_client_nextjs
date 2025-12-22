import { Tables } from '../../../types/database.types';

export type userData = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export type userRegisterData = {
  name: string;
  email: string;
  password: string;
};

export type userLoginData = {
  email: string;
  password: string;
};

export type User = Tables<'users'> & {
  __v?: number;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  friends: User[];
  friends_requests_sent: UserType[];
  friends_requests_received: UserType[];
  created_at: string;
  updated_at: string;
};
