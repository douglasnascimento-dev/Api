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
              msg: 'The name field is required.',
            },
            len: {
              args: [VALIDATION_CONSTANTS.MIN_NAME_LENGTH, VALIDATION_CONSTANTS.MAX_NAME_LENGTH],
              msg: 'The name must be between 3 and 255 characters.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'A user with this email already exists.',
          },
          validate: {
            notNull: {
              msg: 'The email field is required.',
            },
            isEmail: {
              msg: 'The provided email is invalid.',
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
              msg: 'The password field is required.',
            },
            len: {
              args: [VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH, VALIDATION_CONSTANTS.MAX_PASSWORD_LENGTH],
              msg: 'The password must be between 6 and 50 characters.',
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
