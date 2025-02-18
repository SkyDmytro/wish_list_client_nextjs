import {
  createWishListRequestBodyType,
  editWishListRequestBodyType,
} from '@/types/requests';
import { WishListResponse, wishList } from '@/types/wishList';
import { wishlistUrl } from '@/utils/config';

import { deleteRequest, postRequest, putRequest } from '../requests';

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

export const deleteWishListRequest = async (
  wishListId: { wishListId: string },
  token?: string,
) => {
  return deleteRequest<{ wishListId: string }>(
    `${wishlistUrl}/`,
    wishListId,
    token,
  );
};

export const addUserToWishList = async (
  wishListId: string,
  userId: string,
  token?: string,
) => {
  return postRequest<{ userId: string }, wishList>(
    `${wishlistUrl}/${wishListId}/users`,
    { userId: userId },
    token,
  );
};

export const deleteUserFromWishList = async (
  wishListId: string,
  userId: string,
  token?: string,
) => {
  return deleteRequest(
    `${wishlistUrl}/${wishListId}/users/${userId}`,
    {},
    token,
  );
};
