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
              msg: 'O campo nome é obrigatório.',
            },
            len: {
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        surname: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo sobrenome é obrigatório.',
            },
            len: {
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'O sobrenome deve ter entre 3 e 255 caracteres.',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: {
            msg: 'Este e-mail já está cadastrado.',
          },
          validate: {
            notNull: {
              msg: 'O campo e-mail é obrigatório.',
            },
            isEmail: {
              msg: 'O e-mail deve ser um endereço de e-mail válido.',
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo idade é obrigatório.',
            },
            isInt: {
              msg: 'A idade deve ser um número inteiro.',
            },
            min: {
              args: [0],
              msg: 'A idade não pode ser negativa.',
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo peso é obrigatório.',
            },
            isFloat: {
              msg: 'O peso deve ser um número.',
            },
            min: {
              args: [0],
              msg: 'O peso não pode ser negativo.',
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O campo altura é obrigatório.',
            },
            isFloat: {
              msg: 'A altura deve ser um número.',
            },
            min: {
              args: [0],
              msg: 'A altura não pode ser negativa.',
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
    this.hasMany(models.Photo, { foreignKey: 'student_id', as: 'photos' });
  }
}
