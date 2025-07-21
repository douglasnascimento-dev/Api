import { HTTP_STATUS } from '../constants/http.js';

export default function errorMiddleware(error, req, res, _next) {

  let messages = ['Ocorreu um erro interno no servidor.'];
  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (error.errors && Array.isArray(error.errors)) {
    messages = error.errors.map((err) => err.message);
    statusCode = HTTP_STATUS.BAD_REQUEST;
  }
  else if (error.message) {
    messages = [error.message];
    statusCode = error.statusCode || HTTP_STATUS.BAD_REQUEST;
  }

  return res.status(statusCode).json({
    errors: messages,
  });
}
