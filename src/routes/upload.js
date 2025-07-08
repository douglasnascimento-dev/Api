import { Router } from 'express';

import uploadController from '../controllers/Upload.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.post('/', loginRequired,  uploadController.store);

export default router;
