interface JWTPayload {
  _id: string;
  email: string;
  exp?: number;
}

const decodeJWT = (token: string): JWTPayload => {
  if (token === '') {
    throw new Error('Token is required');
  }
  try {
    const base64Url = token.split('.')[1]; // Get payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT', error);
    throw new Error('Invalid token');
  }
};

export default decodeJWT;
