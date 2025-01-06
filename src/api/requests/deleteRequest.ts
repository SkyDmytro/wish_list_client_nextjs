export const deleteRequest = async (url: string, token?: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${token}`,
    },
    credentials: 'include',
  });
  return response.json();
};
