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
              msg: 'The name field is required.',
            },
            len: {
              args: [_validation.MIN_NAME_LENGTH, _validation.MAX_NAME_LENGTH],
              msg: 'The name must be between 3 and 255 characters.',
            },
          },
        },
        surname: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'The surname field is required.',
            },
            len: {
              args: [_validation.MIN_NAME_LENGTH, _validation.MAX_NAME_LENGTH],
              msg: 'The surname must be between 3 and 255 characters.',
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
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
          type: _sequelize2.default.INTEGER,
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
          type: _sequelize2.default.FLOAT,
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
          type: _sequelize2.default.FLOAT,
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
} exports.default = Student;
