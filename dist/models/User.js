"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs');
var _validation = require('../constants/validation');

 class User extends _sequelize.Model {
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
              args: [_validation.VALIDATION_CONSTANTS.MIN_NAME_LENGTH, _validation.VALIDATION_CONSTANTS.MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          unique: {
            msg: 'Já existe um usuário com este e-mail.',
          },
          validate: {
            notNull: {
              msg: 'O campo e-mail é obrigatório.',
            },
            isEmail: {
              msg: 'O e-mail informado é inválido.',
            },
          },
        },
        password_hash: {
          type: _sequelize2.default.STRING,
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo senha é obrigatório.',
            },
            len: {
              args: [_validation.VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH, _validation.VALIDATION_CONSTANTS.MAX_PASSWORD_LENGTH],
              msg: 'A senha deve ter entre 6 e 50 caracteres.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs.hash.call(void 0, user.password, _validation.VALIDATION_CONSTANTS.SALT_ROUNDS);
      }
    });

    User.prototype.checkPassword = function (password) {
      return _bcryptjs.compare.call(void 0, password, this.password_hash);
    };

    return this;
  }
} exports.default = User;
