"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _validation = require('../constants/validation');

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo nome é obrigatório.',
            },
            len: {
              args: [_validation.MIN_NAME_LENGTH, _validation.MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        surname: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo sobrenome é obrigatório.',
            },
            len: {
              args: [_validation.MIN_NAME_LENGTH, _validation.MAX_NAME_LENGTH],
              msg: 'O sobrenome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          unique: {
            msg: 'Este e-mail já está cadastrado.',
          },
          validate: {
            notNull: {
              msg: 'O campo e-mail é obrigatório.',
            },
            isEmail: {
              msg: 'O e-mail deve ser um endereço de e-mail válido.',
            },
          },
        },
        age: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo idade é obrigatório.',
            },
            isInt: {
              msg: 'A idade deve ser um número inteiro.',
            },
            min: {
              args: [0],
              msg: 'A idade não pode ser negativa.',
            },
          },
        },
        weight: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo peso é obrigatório.',
            },
            isFloat: {
              msg: 'O peso deve ser um número.',
            },
            min: {
              args: [0],
              msg: 'O peso não pode ser negativo.',
            },
          },
        },
        height: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo altura é obrigatório.',
            },
            isFloat: {
              msg: 'A altura deve ser um número.',
            },
            min: {
              args: [0],
              msg: 'A altura não pode ser negativa.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'students',
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'studentId', as: 'photos' });
  }
} exports.default = Student;
