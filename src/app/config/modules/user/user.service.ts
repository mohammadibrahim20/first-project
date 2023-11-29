import config from '../..';
import { AcademicSemester } from '../acdemicSemester/academicSemester.model';
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

  //   set  generated id
  userData.id = await generatedStudentId(admissionSemester);
  //   create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = Student.create(payload);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
