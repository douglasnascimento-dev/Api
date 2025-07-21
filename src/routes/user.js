import { Router } from 'express';
import UserController from '../controllers/User.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', loginRequired, UserController.show);
router.post('/', UserController.store);
router.put('/', loginRequired,  UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
