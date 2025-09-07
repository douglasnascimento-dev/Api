import { sign } from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http.js';
import User from '../models/User.js';
class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['Email e senha são obrigatórios'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: ['Credenciais inválidas'] });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: ['Credenciais inválidas'] });
    }

    const { id } = user;
    const token = sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}

export default new TokenController();
