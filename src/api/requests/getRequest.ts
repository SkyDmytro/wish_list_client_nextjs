export const getRequest = async (url: string, token?: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${token}`,
    },
    credentials: 'include',
  });
  return response.json();
};
