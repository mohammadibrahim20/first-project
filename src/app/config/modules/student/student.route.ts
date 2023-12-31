import express from 'express';
import auth from '../../../middleware/auth';
import validateRequest from '../../../middleware/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';
const router = express.Router();

// will call controller function

router.get('/', auth('student'), StudentControllers.getAllStudents);

router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoutes = router;
