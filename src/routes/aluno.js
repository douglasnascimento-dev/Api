import { Router } from 'express';
import AlunoController from '../controllers/Aluno.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', loginRequired, AlunoController.index);
router.get('/:id', AlunoController.show);
router.post('/', loginRequired, AlunoController.store);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;
