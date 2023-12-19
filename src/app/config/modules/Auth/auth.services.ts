import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../..';
import AppError from '../../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  if (user.isDeleted === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked !');
  }

  //   check if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }
  const jwtPayload = { userId: user.id, role: user.role };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
export const AuthServices = {
  loginUser,
};
