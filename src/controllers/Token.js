import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { HTTP_STATUS } from '../constants/http.js';

import User from '../models/User.js';
dotenv.config();

class Token {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Invalid password' });
    }

    const token = sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({token, user: {name: user.name, id: user.id, email}});
  }
}

export default new Token();
