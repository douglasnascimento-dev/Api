import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';
import { VALIDATION_CONSTANTS } from '../constants/validation';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo nome é obrigatório.',
            },
            len: {
              args: [VALIDATION_CONSTANTS.MIN_NAME_LENGTH, VALIDATION_CONSTANTS.MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.VIRTUAL,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo senha é obrigatório.',
            },
            len: {
              args: [VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH, VALIDATION_CONSTANTS.MAX_PASSWORD_LENGTH],
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
        user.password_hash = await hash(user.password, VALIDATION_CONSTANTS.SALT_ROUNDS);
      }
    });

    User.prototype.checkPassword = function (password) {
      return compare(password, this.password_hash);
    };

    return this;
  }
}
