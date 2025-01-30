import { createGiftRequestBodyType } from '@/types/requests';
import { GiftResponse } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { deleteRequest, postRequest, putRequest } from '../requests';

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

export const updateGiftRequest = async (
  id: string,
  gift: createGiftRequestBodyType,
  token?: string,
) => {
  return putRequest<createGiftRequestBodyType, GiftResponse>(
    `${wishlistUrl}/${id}/items`,
    gift,
    token,
  );
};
