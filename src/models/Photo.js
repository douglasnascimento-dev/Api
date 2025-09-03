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
              msg: 'O campo não pode estar vazio.',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O campo não pode estar vazio.',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${APP_CONFIG.url}/images/${this.getDataValue('filename')}`;
          },
        },
        studentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          field: 'student_id',
        },
      },
      {
        sequelize,
        tableName: 'photos',
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}
