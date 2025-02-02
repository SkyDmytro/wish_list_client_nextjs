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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    console.error('Request failed:', (e as any).message || 'An error occurred');
    throw e;
  }
};
