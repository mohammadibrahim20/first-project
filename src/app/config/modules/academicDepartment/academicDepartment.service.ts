import { TAcademicDepartment } from './academicDapartment.interface';
import { AcademicDepartment } from './academicDapartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  console.log(result);
  return result;
};
const getSingleAcademicDepartmentFromDB = async (_id: string) => {
  const result = await AcademicDepartment.findOne({ _id }).populate(
    'academicFaculty',
  );

  return result;
};
const updateAcademicDepartmentIntoDB = async (
  _id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id }, payload);
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
