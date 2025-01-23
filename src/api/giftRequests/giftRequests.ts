import { GiftItem, GiftResponse } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { postRequest } from '../requests';

type requestBodyType = Omit<GiftItem, '_id'> & {
  wishListId: string;
  userId: string;
};

export const createGiftRequest = async (
  gift: requestBodyType,
  token?: string,
): Promise<GiftResponse> => {
  const response = await postRequest<requestBodyType, GiftResponse>(
    `${wishlistUrl}/items`,
    gift,
    token,
  );

  return response;
};
