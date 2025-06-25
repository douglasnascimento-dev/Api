"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

var _homejs = require('./routes/home.js'); var _homejs2 = _interopRequireDefault(_homejs);
var _userjs = require('./routes/user.js'); var _userjs2 = _interopRequireDefault(_userjs);
var _tokenjs = require('./routes/token.js'); var _tokenjs2 = _interopRequireDefault(_tokenjs);
var _alunojs = require('./routes/aluno.js'); var _alunojs2 = _interopRequireDefault(_alunojs);
var _uploadjs = require('./routes/upload.js'); var _uploadjs2 = _interopRequireDefault(_uploadjs);

require('./database/index.js');

const whiteList = [
  'https://projeto1.douglasnascimento.dev.br',
  'http://localhost:5173'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

_dotenv2.default.config();

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default);
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use('/images', _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', _homejs2.default);
    this.app.use('/users', _userjs2.default);
    this.app.use('/tokens', _tokenjs2.default);
    this.app.use('/alunos', _alunojs2.default);
    this.app.use('/api/upload', _uploadjs2.default);
  }
}

exports. default = new App().app;
