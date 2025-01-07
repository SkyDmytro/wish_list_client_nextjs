import { API_URL } from '@/utils/config';

export const postRequest = async (
  url: string,
  body: Record<string, string>,
  token?: string,
) => {
  const response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${token}`,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return response.json();
};
