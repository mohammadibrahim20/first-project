import express from 'express';

import validateRequest from '../../../middleware/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
