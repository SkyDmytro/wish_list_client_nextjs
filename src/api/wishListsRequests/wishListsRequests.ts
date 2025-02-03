import { createWishListRequestBodyType } from '@/types/requests';
import { WishListResponse } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { postRequest } from '../requests';

export const createWishListRequest = async (
  wishList: createWishListRequestBodyType,
  token?: string,
) => {
  return postRequest<createWishListRequestBodyType, WishListResponse>(
    `${wishlistUrl}/`,
    wishList,
    token,
  );
};
