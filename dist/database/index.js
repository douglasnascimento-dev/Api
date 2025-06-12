"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _databasejs = require('../config/database.js'); var _databasejs2 = _interopRequireDefault(_databasejs);
var _Alunojs = require('../models/Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);
var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _Uploadjs = require('../models/Upload.js'); var _Uploadjs2 = _interopRequireDefault(_Uploadjs);

const models = [_Alunojs2.default, _Userjs2.default, _Uploadjs2.default];
const connection = new (0, _sequelize2.default)(_databasejs2.default);

models.forEach((model) => {
  model.init(connection);
});

models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
