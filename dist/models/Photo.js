"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../constants/config');

 class Photo extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo não pode estar vazio.',
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo não pode estar vazio.',
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_config.APP_CONFIG.url}/images/${this.getDataValue('filename')}`;
          }
        }
      },
      {
        sequelize,
        tableName: 'photos'
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    }
} exports.default = Photo;
