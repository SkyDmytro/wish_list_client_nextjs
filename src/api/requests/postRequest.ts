import { API_URL } from '@/utils/config';

export const postRequest = async (
  url: string,
  body: Record<string, string>,
) => {
  const response = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return response.json();
};
