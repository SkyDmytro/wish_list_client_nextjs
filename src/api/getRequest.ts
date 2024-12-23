export const getRequest = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${localStorage.getItem('jwt')}`,
    },
  });
  return response.json();
};
