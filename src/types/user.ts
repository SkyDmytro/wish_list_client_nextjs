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

export type UserType = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token?: string;
};
