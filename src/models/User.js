import Sequelize, { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, SALT_ROUNDS } from '../constants/constants';

export default class User extends Model {

  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Já existe um usuário cadastrado com este email.',
          },
          validate: {
            isEmail: {
              msg: 'O email informado é inválido.',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.VIRTUAL,
          allowNull: true,
          defaultValue: '',
          validate: {
            len: {
              args: [MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH],
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
        user.password_hash = await hash(user.password, SALT_ROUNDS);
      }
    });

    User.prototype.checkPassword = function (password) {
      return compare(password, this.password_hash);
    };

    return this;
  }
}
