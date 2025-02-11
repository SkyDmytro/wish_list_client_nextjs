import { GiftItem } from './wishList';

export type createGiftRequestBodyType = Omit<GiftItem, '_id'> & {
  wishListId: string;
  userId: string;
};

export type createWishListRequestBodyType = {
  title: string;
  owner: string;
  access: 'private' | 'public';
};

export type editWishListRequestBodyType = {
  _id: string;
} & Partial<Omit<createWishListRequestBodyType, '_id'>>;
