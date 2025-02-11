import {
  createWishListRequestBodyType,
  editWishListRequestBodyType,
} from '@/types/requests';
import { WishListResponse } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { postRequest, putRequest } from '../requests';

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

export const editWishListRequest = async (
  id: string,
  wishList: editWishListRequestBodyType,
  token?: string,
) => {
  return putRequest<editWishListRequestBodyType, WishListResponse>(
    `${wishlistUrl}/`,
    wishList,
    token,
  );
};
