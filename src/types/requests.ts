import { GiftItem } from './wishList';

export type createGiftRequestBodyType = Omit<GiftItem, '_id'> & {
  wishListId: string;
  userId: string;
};
