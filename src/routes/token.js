import { Router } from 'express';
import TokenController from '../controllers/Token.js';

const router = new Router();

router.post('/', TokenController.store);

export default router;
