export const getTokenFromAuthorizationHeader = (authorization: string | undefined): string | null => {
  if (!authorization) {
    return null;
  }

  const token = authorization.split(' ')[1];
  return token || null;
};
