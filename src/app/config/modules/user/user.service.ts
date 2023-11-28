import config from '../..';
import { Student } from '../student/student.model';
import { TStudent } from '../student/studnt.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};
  // if password is not provided, use default password
  userData.password = password || (config.defaultPass as string);
  //   set student role
  userData.role = 'student';
  //   create a user
  //   set manually generated id
  userData.id = '203010010';
  //   create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
