import { RequestHandler, response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { UserService } from './user.service';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    // console.log(studentData);

    const result = await UserService.createStudentIntoDB(
      password as string,
      studentData,
    );

    sendResponse(response, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
