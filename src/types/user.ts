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
  avatar?: string;
  __v: number;
  token?: string;
  friends: UserType[];
};

export type FriendResponse = {
  items: UserType[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
};
