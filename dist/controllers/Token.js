"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken');
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

var _constantsjs = require('../constants/constants.js');

var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
_dotenv2.default.config();

class Token {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(_constantsjs.HTTP_STATUS.BAD_REQUEST).json({ errors: 'O Email e a senha são necessários' });
    }

    const user = await _Userjs2.default.findOne({ where: { email } });

    if (!user) {
      return res.status(_constantsjs.HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(_constantsjs.HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Senha inválida' });
    }

    const token = _jsonwebtoken.sign.call(void 0, { id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({token, user: {nome: user.nome, id: user.id, email}});
  }
}

exports. default = new Token();
