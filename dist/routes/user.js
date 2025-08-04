"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Userjs = require('../controllers/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);

const router = new (0, _express.Router)();

router.get('/', _loginRequiredjs2.default, _Userjs2.default.show);
router.post('/', _Userjs2.default.store);
router.put('/', _loginRequiredjs2.default,  _Userjs2.default.update);
router.delete('/', _loginRequiredjs2.default, _Userjs2.default.delete);

exports. default = router;
