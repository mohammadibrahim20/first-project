import express, { NextFunction, Request, Response } from 'express';

import auth from '../../../middleware/auth';
import validateRequest from '../../../middleware/validateRequest';
import { upload } from '../../../utils/sendImageClodinary';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { studentValidations } from '../student/student.validation';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  upload.single('file'),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('student'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changStatus,
);

router.get('/me', auth('student', 'admin', 'faculty'), UserControllers.getMe);

export const UserRoutes = router;
