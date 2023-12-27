import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../config/modules/user/user.interface';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const secret = config.jwt_access_secret as string;

    // checking if the given token is valid
    const decoded = jwt.verify(token, secret);
    console.log(decoded);

    // const { role, userId, iat } = decoded;
    next();

    // // checking if the user is exist
    // const user = await User.isUserExistsByCustomId(userId);

    // if (!user) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    // }
    // // checking if the user is already deleted

    // const isDeleted = user?.isDeleted;

    // if (isDeleted) {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    // }

    // // checking if the user is blocked
    // const userStatus = user?.status;

    // if (userStatus === 'blocked') {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    // }

    // // if (
    // //   user.passwordChangedAt &&
    // //   User.isJWTIssuedBeforePasswordChanged(
    // //     user.passwordChangedAt,
    // //     iat as number,
    // //   )
    // // ) {
    // //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // // }

    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(
    //     httpStatus.UNAUTHORIZED,
    //     'You are not authorized  hi!',
    //   );
    // }

    // req.user = decoded as JwtPayload;
    // next();
  });
};

export default auth;
