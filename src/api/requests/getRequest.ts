export const getRequest = async <T>(
  url: string,
  token?: string,
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${token}`,
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`,
      );
    }

    return (await response.json()) as T;
  } catch (e: unknown) {
    console.error('Request failed:', e.message);
    throw e;
  }
};
