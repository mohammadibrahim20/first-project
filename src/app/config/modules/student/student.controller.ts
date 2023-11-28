import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student isi retrieved successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student isi retrieved successfully',
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteSingleStudentFromDB(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student are deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
