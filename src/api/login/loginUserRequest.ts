import { LoginSchema } from '@/schemas/userLogin.schema';
import { userUrl } from '@/utils/config';

import { postRequest } from '../requests';

export const loginUserRequest = async (userLoginData: LoginSchema) => {
  return postRequest(`${userUrl}/auth`, userLoginData);
};
