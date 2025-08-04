import { Router } from 'express';
import StudentController from '../controllers/Student.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', loginRequired, StudentController.index);
router.get('/:id', loginRequired, StudentController.show);
router.post('/', loginRequired, StudentController.store);
router.put('/:id', loginRequired, StudentController.update);
router.delete('/:id', loginRequired, StudentController.delete);

export default router;
