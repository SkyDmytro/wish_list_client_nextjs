import { createGiftRequestBodyType } from '@/types/requests';
import { GiftResponse } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { deleteRequest, postRequest } from '../requests';

export const createGiftRequest = async (
  gift: createGiftRequestBodyType,
  token?: string,
): Promise<GiftResponse> => {
  const response = await postRequest<createGiftRequestBodyType, GiftResponse>(
    `${wishlistUrl}/items`,
    gift,
    token,
  );

  return response;
};

export const deleteGiftRequest = async (id: string, token?: string) => {
  return deleteRequest(`${wishlistUrl}/${id}/items`, token);
};
