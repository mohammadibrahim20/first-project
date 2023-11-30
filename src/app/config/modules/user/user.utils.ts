import { TAcademicSemester } from '../acdemicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};
export const generatedStudentId = async (payload: TAcademicSemester) => {
  // first time 0000

  const currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  if (lastStudentId) {
    const lastStudentSemesterCode = lastStudentId?.substring(0, 4);
    const lastStudentYear = lastStudentId?.substring(0, 4);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
