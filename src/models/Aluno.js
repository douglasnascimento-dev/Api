import Sequelize, { Model } from 'sequelize';
import { MAX_NAME_LENGTH, MIN_NAME_LENGTH } from '../constants/constants.js';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            len: {
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'O nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            len: {
              args: [MIN_NAME_LENGTH, MAX_NAME_LENGTH],
              msg: 'O sobrenome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: '',
          unique: true,
          validate: {
            isEmail: {
              msg: 'O email deve ser um endereço de email válido',
            },
          },
        },
        idade: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          validate: {
            isInt: {
              msg: 'A idade deve ser um número inteiro',
            },
            min: {
              args: 0,
              msg: 'A idade não pode ser negativa',
            },
          },
          allowNull: false,
        },
        peso: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
          allowNull: false,
          validate: {
            isFloat: {
              msg: 'O peso deve ser um número decimal',
            },
            min: {
              args: 0,
              msg: 'O peso não pode ser negativo',
            },
          },
        },
        altura: {
          type: Sequelize.FLOAT,
          defaultValue: 0.0,
          allowNull: false,
          validate: {
            isFloat: {
              msg: 'A altura deve ser um número decimal',
            },
            min: {
              args: 0,
              msg: 'A altura não pode ser negativa',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'alunos',
      },
    );

    return this;
  }

  static associate(models){
    this.hasMany(models.Upload, {foreignKey: 'aluno_id'});
  }
}
