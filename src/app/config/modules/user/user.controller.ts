import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDB(
    password as string,
    studentData,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
