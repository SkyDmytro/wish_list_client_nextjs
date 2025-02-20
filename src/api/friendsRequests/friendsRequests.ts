import { userUrl } from '@/utils/config';

import { deleteRequest, postRequest } from '../requests';

export const addFriendRequest = async (id: string, token?: string) => {
  return postRequest(`${userUrl}/${id}/friends`, {}, token);
};

export const deleteFriendRequest = async (id: string, token?: string) => {
  return deleteRequest(`${userUrl}/${id}/friends`, {}, token);
};
