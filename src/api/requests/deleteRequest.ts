export const deleteRequest = async (url: string, token?: string) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
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

    return response.json();
  } catch (e: unknown) {
    console.error('Request failed:', e);
    throw e;
  }
};
