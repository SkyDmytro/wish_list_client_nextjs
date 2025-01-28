import { GiftItem, GiftResponse } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { deleteRequest, postRequest } from '../requests';

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

export const deleteGiftRequest = async (id: string, token?: string) => {
  return deleteRequest(`${wishlistUrl}/${id}/items`, token);
};
