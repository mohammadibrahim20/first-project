import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../..';
import AppError from '../../../errors/appError';
import { sendEmail } from '../../../utils/sendEmail';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

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

  const jwtPayload = { userId: user.id as string, role: user.role };
  if (!jwtPayload) {
    throw new AppError(httpStatus.FORBIDDEN, 'not');
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expireIn as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expireIn as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);

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

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect');
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};
const refreshToken = async (token: string) => {
  // checking if the token is missing

  const secret = config.jwt_refresh_secret as string;

  // checking if the given token is valid
  const decoded = jwt.verify(token, secret);

  const { userId, iat } = decoded as JwtPayload;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = { userId: user.id as string, role: user.role };
  if (!jwtPayload) {
    throw new AppError(httpStatus.FORBIDDEN, 'not');
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expireIn as string,
  );
  return { accessToken };
};
const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  const jwtPayload = { userId: user.id as string, role: user.role };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '60m',
  );
  const resetUiLink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;

  sendEmail(user.email, resetUiLink);
  return { message: 'check your email' };
};
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  const secret = config.jwt_access_secret as string;

  // checking if the given token is valid
  const decoded = jwt.verify(token, secret) as JwtPayload;

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'you are forbidden!');
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );
  return null;
};
export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
