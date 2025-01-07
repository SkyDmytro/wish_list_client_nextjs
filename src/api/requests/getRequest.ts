export const getRequest = async <T>(
  url: string,
  token?: string,
): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${token}`,
    },
    credentials: 'include',
  });
  return (await response.json()) as Promise<T>;
};
