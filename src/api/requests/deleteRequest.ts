export const deleteRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${localStorage.getItem('jwt')}`,
    },
    credentials: 'include',
  });
  return response.json();
};
