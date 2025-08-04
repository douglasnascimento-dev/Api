"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _httpjs = require('../constants/http.js');

_dotenv2.default.config();

function getTokenFromHeader(authorization) {
  if (!authorization) return null;
  const [scheme, token] = authorization.split(' ');

  if (!token || scheme !== 'Bearer') return null;

  return token;
}

async function getUserFromToken(token) {
  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await _Userjs2.default.findOne({ where: { id, email } });

    if (!user) return null;

    return { id, email };
  } catch (e) {

    return null;
  }
}

exports. default = async function (req, res, next) {
  const token = getTokenFromHeader(req.headers.authorization);

  if (!token) {
    return res.status(_httpjs.HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Token não informado ou mal formatado' });
  }

  const userData = await getUserFromToken(token);

  if (!userData) {
    return res.status(_httpjs.HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Token inválido. Gere um novo Token' });
  }

  req.user = userData;

  return next();
}
