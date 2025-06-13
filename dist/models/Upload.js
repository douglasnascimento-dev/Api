"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _constants = require('../constants/constants');

 class Upload extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O Campo não pode ser vazio',
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O Campo não pode ser vazio',
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_constants.URLCONSTANTS.url}/images/${this.getDataValue('filename')}`;
          }
        }
      },
      {
        sequelize,
        tableName: 'upload'
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, {
      foreignKey: 'aluno_id',
    });
  }
} exports.default = Upload;
