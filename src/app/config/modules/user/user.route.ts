import express from 'express';

import validateRequest from '../../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createStudentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

export const UserRoutes = router;
