"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Tokenjs = require('../controllers/Token.js'); var _Tokenjs2 = _interopRequireDefault(_Tokenjs);

const router = new (0, _express.Router)();

router.post('/', _Tokenjs2.default.store);

exports. default = router;
