import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { HTTP_STATUS } from '../constants/constants.js';

import User from '../models/User.js';
dotenv.config();

class Token {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: 'O Email e a senha são necessários' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Usuário não encontrado' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Senha inválida' });
    }

    const token = sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({token, user: {name: user.name, id: user.id, email}});
  }
}

export default new Token();
