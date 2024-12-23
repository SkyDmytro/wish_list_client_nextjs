export const postRequest = async (
  url: string,
  body: Record<string, string>,
) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(body),
  });
  return response.json();
};
