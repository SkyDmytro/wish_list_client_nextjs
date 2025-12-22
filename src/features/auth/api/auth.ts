import { UserType } from '@/entities/user/types/user';
import { toast } from '@/hooks/use-toast';
import { api } from '@/lib/ApiClient';

import { Session } from '@supabase/supabase-js';

import { LoginSchema } from '../schemas/userLogin.schema';
import { RegisterSchema } from '../schemas/userRegister.schema';

export const authApi = {
  login: async (userLoginData: LoginSchema) => {
    try {
      const response = await api.post<
        { user: UserType; session: Session },
        LoginSchema
      >('/api/auth/login', userLoginData);

      toast({
        title: 'Success',
        description: 'Logged in successfully',
        variant: 'default',
        duration: 3000,
      });
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  register: async (userRegisterData: RegisterSchema) => {
    return await api.post<{ user: UserType; session: Session }, RegisterSchema>(
      '/api/auth/register',
      userRegisterData,
    );
  },
};
