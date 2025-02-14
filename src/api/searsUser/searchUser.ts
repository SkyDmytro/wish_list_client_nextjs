'use server';

import { API_URL } from '@/utils/config';

import { getRequest } from '../requests';

export const searchUser = async (name: string, token: string) => {
  return getRequest(`${API_URL}/api/users/search/${name}`, token);
};
