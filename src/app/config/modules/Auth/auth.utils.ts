import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiredIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: expiredIn,
  });
};
