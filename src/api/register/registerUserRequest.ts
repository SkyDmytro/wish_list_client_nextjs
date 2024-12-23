import { userRegisterData } from '@/types/user';
import { userUrl } from '@/utils/config';

import { postRequest } from '../requests';

export const registerUserRequest = async (
  userRegisterData: userRegisterData,
) => {
  return postRequest(`${userUrl}/`, userRegisterData);
};
