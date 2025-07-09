"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _constantsjs = require('../constants/constants.js');

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            len: {
              args: [_constantsjs.MIN_NAME_LENGTH, _constantsjs.MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        sobrenome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            len: {
              args: [_constantsjs.MIN_NAME_LENGTH, _constantsjs.MAX_NAME_LENGTH],
              msg: 'O sobrenome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          defaultValue: '',
          unique: true,
          validate: {
            isEmail: {
              msg: 'O email deve ser um endereço de email válido',
            },
          },
        },
        idade: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },
        peso: {
          type: _sequelize2.default.FLOAT,
          defaultValue: 0.0,
          allowNull: false,
        },
        altura: {
          type: _sequelize2.default.FLOAT,
          defaultValue: 0.0,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'alunos',
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Upload, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
