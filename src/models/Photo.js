import Sequelize, { Model } from 'sequelize';

import { APP_CONFIG } from '../constants/config';

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'The field cannot be empty',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'The field cannot be empty',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${APP_CONFIG.url}/images/${this.getDataValue('filename')}`;
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
    this.belongsTo(models.Student, {
      foreignKey: 'studentId',
    });
  }
}
