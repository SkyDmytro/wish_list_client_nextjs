export const putRequest = async (
  url: string,
  body: Record<string, string>,
  token?: string,
) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `jwt=${token}`,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return response.json();
};
