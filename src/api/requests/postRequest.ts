import { API_URL } from '@/utils/config';

export const postRequest = async (
  url: string,
  body: Record<string, string>,
  token?: string,
) => {
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
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
