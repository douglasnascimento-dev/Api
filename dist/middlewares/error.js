"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _httpjs = require('../constants/http.js');

 function errorMiddleware(error, req, res, _next) {

  let messages = ['Ocorreu um erro interno no servidor.'];
  let statusCode = _httpjs.HTTP_STATUS.INTERNAL_SERVER_ERROR;

  if (error.errors && Array.isArray(error.errors)) {
    messages = error.errors.map((err) => err.message);
    statusCode = _httpjs.HTTP_STATUS.BAD_REQUEST;
  }
  else if (error.message) {
    messages = [error.message];
    statusCode = error.statusCode || _httpjs.HTTP_STATUS.BAD_REQUEST;
  }

  return res.status(statusCode).json({
    errors: messages,
  });
} exports.default = errorMiddleware;
