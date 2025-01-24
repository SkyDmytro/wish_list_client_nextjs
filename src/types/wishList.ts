import { currencyType } from './types';

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

export type WishListResponse = {
  items: wishList[];
  meta: {
    page: number;
    totalPages: number;
    pageSize: number;
    total: number;
  };
};

export interface GiftItem {
  _id: string;
  name: string;
  price: number;
  currency: currencyType;
  url: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Available' | 'Reserved';
}

export type GiftResponse = {
  items: GiftItem[];
  meta: {
    page: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
  };
};
