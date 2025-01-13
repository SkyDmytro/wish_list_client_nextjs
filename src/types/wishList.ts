export type wishList = {
  _id: string;
  title: string;
  owner: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  access: 'private' | 'public';
  usersWithAccess: string[];
};

export type wishListResponse = {
  items: wishList[];
  meta: unknown;
};
