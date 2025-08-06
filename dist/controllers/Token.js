"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken');
var _httpjs = require('../constants/http.js');
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(_httpjs.HTTP_STATUS.BAD_REQUEST).json({ errors: ['Email and password are required'] });
    }

    const user = await _Userjs2.default.findOne({ where: { email } });

    if (!user) {
      return res.status(_httpjs.HTTP_STATUS.UNAUTHORIZED).json({ errors: ['Invalid credentials'] });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(_httpjs.HTTP_STATUS.UNAUTHORIZED).json({ errors: ['Invalid credentials'] });
    }

    const { id } = user;
    const token = _jsonwebtoken.sign.call(void 0, { id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user });
  }
}

exports. default = new TokenController();
