import { Router } from 'express';

import PhotoController from '../controllers/Photo.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.post('/', loginRequired,  PhotoController.store);

export default router;
