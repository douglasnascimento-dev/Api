import Sequelize, { Model } from 'sequelize';

import {url} from '../constants/constants';

export default class Upload extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O Campo não pode ser vazio',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O Campo não pode ser vazio',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${url.url}/images/${this.getDataValue('filename')}`;
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
}
