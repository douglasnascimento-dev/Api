import Sequelize, { Model } from 'sequelize';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../constants/validation';

export default class Student extends Model {
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
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'The name must be between 3 and 255 characters.',
            },
          },
        },
        surname: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'The surname field is required.',
            },
            len: {
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'The surname must be between 3 and 255 characters.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'This email is already registered.',
          },
          validate: {
            notNull: {
              msg: 'The EMAIL field is required.',
            },
            isEmail: {
              msg: 'The email must be a valid email address.',
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'The age field is required.',
            },
            isInt: {
              msg: 'The age must be an integer.',
            },
            min: {
              args: [0],
              msg: 'The age cannot be negative.',
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'The weight field is required.',
            },
            isFloat: {
              msg: 'The weight must be a number.',
            },
            min: {
              args: [0],
              msg: 'The weight cannot be negative.',
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'The height field is required.',
            },
            isFloat: {
              msg: 'The height must be a number.',
            },
            min: {
              args: [0],
              msg: 'The height cannot be negative.',
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
    this.hasMany(models.Photo, { foreignKey: 'studentId' });
  }
}
