import { Router } from 'express';
import { StudentRoutes } from '../config/modules/student/student.route';
import { UserRoutes } from '../config/modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
