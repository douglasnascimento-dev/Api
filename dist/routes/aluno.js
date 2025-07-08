"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Alunojs = require('../controllers/Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);

const router = new (0, _express.Router)();

router.get('/', _loginRequiredjs2.default, _Alunojs2.default.index);
router.get('/:id', _Alunojs2.default.show);
router.post('/', _loginRequiredjs2.default, _Alunojs2.default.store);
router.put('/:id', _loginRequiredjs2.default, _Alunojs2.default.update);
router.delete('/:id', _loginRequiredjs2.default, _Alunojs2.default.delete);

exports. default = router;
