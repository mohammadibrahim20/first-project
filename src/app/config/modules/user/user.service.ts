import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../..';
import AppError from '../../../errors/appError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.model';
import { TStudent } from '../student/studnt.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password is not provided, use default password
  userData.password = password || (config.defaultPass as string);
  //   set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //   set  generated id
    userData.id = await generatedStudentId(admissionSemester);
    //   create a user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
  }
};

export const UserService = {
  createStudentIntoDB,
};
