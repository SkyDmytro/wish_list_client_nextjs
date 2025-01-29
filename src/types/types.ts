import { currencies } from '@/utils/constants';

import { GiftItem } from './wishList';

export type currencyType = keyof typeof currencies;

export type GiftType = Omit<
  GiftItem,
  '_id' | 'status' | 'wishListId' | 'userId'
> & {
  currency: currencyType;
};
