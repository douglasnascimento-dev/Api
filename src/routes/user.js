import { Router } from 'express';
import userController from '../controllers/User.js';
import loginRequired from '../middlewares/loginRequired.js';

const router = new Router();

router.get('/', loginRequired, userController.show);
router.post('/', userController.store);
router.put('/', loginRequired,  userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/* Nomes para controllers
- ATÉ 5 MÉTODOS
- index: lista todos os registros - GET
- create/store: cria um novo registro - POST
- delete: deleta um registro - DELETE
- show: exibe um registro específico - GET
- update: atualiza um registro específico - PATCH ou PUT
*/
