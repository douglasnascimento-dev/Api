import { Router } from 'express';

import PhotoController from '../controllers/Photo.js';
import loginRequired from '../middlewares/loginRequired.js';
import multer from 'multer';
import multerConfig from '../config/multer.js';

const upload = multer(multerConfig);
const router = new Router();

router.post('/', loginRequired, upload.single(), PhotoController.store);

export default router;
