import { Router } from 'express';
import tokenController from '../controllers/Token.js';

const router = new Router();

router.post('/', tokenController.store);

export default router;
