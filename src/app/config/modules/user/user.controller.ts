import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user as JwtPayload;
  const result = await UserService.getMe(userId, role);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile Data retried successfully',
    data: result,
  });
});
const createStudent = catchAsync(async (req, res) => {
  // const { password, student: studentData } = req.body;
  // console.log(req.file);
  console.log(req.body);
  // const result = await UserService.createStudentIntoDB(
  //   password as string,
  //   studentData,
  // );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    data: null,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
const changStatus = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status Updated successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changStatus,
};
