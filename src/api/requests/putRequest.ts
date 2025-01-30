import { API_URL } from '@/utils/config';

export const putRequest = async <T, R>(
  url: string,
  body: T,
  token?: string,
): Promise<R> => {
  const fullUrl = `${API_URL}${url}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${token}`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`,
      );
    }

    return response.json();
  } catch (e: unknown) {
    console.error('Request failed:', e);
    throw e;
  }
};
