export const putRequest = async (url: string, body: Record<string, string>) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return response.json();
};
