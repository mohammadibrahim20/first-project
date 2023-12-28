import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiredIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiredIn,
  });
};
export const verifyToken = (token: string, secret: string) => {
  // checking if the given token is valid
  return jwt.verify(token, secret) as JwtPayload;
};
