"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Studentjs = require('../controllers/Student.js'); var _Studentjs2 = _interopRequireDefault(_Studentjs);
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);

const router = new (0, _express.Router)();

router.get('/', _loginRequiredjs2.default, _Studentjs2.default.index);
router.get('/:id', _loginRequiredjs2.default, _Studentjs2.default.show);
router.post('/', _loginRequiredjs2.default, _Studentjs2.default.store);
router.put('/:id', _loginRequiredjs2.default, _Studentjs2.default.update);
router.delete('/:id', _loginRequiredjs2.default, _Studentjs2.default.delete);

exports. default = router;
