"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _Photojs = require('../controllers/Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);
var _loginRequiredjs = require('../middlewares/loginRequired.js'); var _loginRequiredjs2 = _interopRequireDefault(_loginRequiredjs);
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerjs = require('../config/multer.js'); var _multerjs2 = _interopRequireDefault(_multerjs);

const upload = _multer2.default.call(void 0, _multerjs2.default);
const router = new (0, _express.Router)();

router.post('/', _loginRequiredjs2.default, upload.single('photo'), _Photojs2.default.store);
router.delete('/:studentId/all', _loginRequiredjs2.default, _Photojs2.default.deleteAll);
router.delete('/:studentId/:photoId', _loginRequiredjs2.default, _Photojs2.default.delete);

exports. default = router;
