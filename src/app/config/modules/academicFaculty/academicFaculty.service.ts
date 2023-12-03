import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (_id: string) => {
  const result = await AcademicFaculty.findOne({ _id });
  return result;
};
const updateAcademicFacultyIntoDB = async (
  _id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({ _id }, payload);
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
