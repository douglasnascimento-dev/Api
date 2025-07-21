import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { HTTP_STATUS } from '../constants/http.js';

dotenv.config();

function getTokenFromHeader(authorization) {
  if (!authorization) return null;
  const [scheme, token] = authorization.split(' ');

  if (!token || scheme !== 'Bearer') return null;

  return token;
}

async function getUserFromToken(token) {
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await User.findOne({ where: { id, email } });

    if (!user) return null;

    return { id, email };
  } catch {

    return null;
  }
}

export default async function (req, res, next) {
  const token = getTokenFromHeader(req.headers.authorization);

  if (!token) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Token não informado ou mal formatado' });
  }

  const userData = await getUserFromToken(token);

  if (!userData) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ errors: 'Token inválido. Gere um novo Token' });
  }

  req.user = userData;

  return next();
}
