import { API_URL } from '@/utils/config';

/**
 * Sends a POST request to the specified URL.
 *
 * @param url - The endpoint to send the request to.
 * @param body - The body of the request, typed as T.
 * @param token - Optional JWT token for authorization.
 * @returns A promise that resolves to the response data, typed as T.
 * @throws Will throw an error if the request fails.
 */
export const postRequest = async <T, R>(
  url: string,
  body: T,
  token?: string,
): Promise<R> => {
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
      const errorData: { message?: string } = await response
        .json()
        .catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`,
      );
    }

    return response.json() as Promise<R>;
  } catch (e: unknown) {
    console.error('Request failed:', (e as Error).message);
    throw e;
  }
};
