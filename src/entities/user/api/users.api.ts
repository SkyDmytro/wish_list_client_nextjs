import { UserType } from '@/entities/user';
import { api } from '@/lib/ApiClient';

export const usersApi = {
  getUser: async (id: string, search?: string) => {
    return api.get<{ data: UserType }>(`/api/users/${id}`, {
      params: {
        search,
      },
    });
  },
  getUsers: async (search?: string) => {
    return api.get<{ data: UserType[] }>(`/api/users?search=${search}`);
  },
};
