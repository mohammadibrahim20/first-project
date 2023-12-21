import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../config/modules/user/user.interface';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
const auth = (...reqRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    // if the token is sent form client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized1');
    }
    // check if the token is valid
    const accessToken = config.jwt_access_secret as string;

    const decoded = jwt.verify(token, accessToken) as JwtPayload;

    const role = decoded.role;
    if (reqRoles && !reqRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized!from role3',
      );
    }
    req.user = decoded;
    next();
  });
};

export default auth;
