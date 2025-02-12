import { API_URL } from '@/utils/config';

export const deleteRequest = async <T>(
  url: string,
  body: T,
  token?: string,
) => {
  const fullUrl = `${API_URL}${url}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${token}`,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
      body: JSON.stringify(body),
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
