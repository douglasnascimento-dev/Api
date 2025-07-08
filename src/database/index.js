import Sequelize from 'sequelize';

import config from '../config/database.js';
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';
import Upload from '../models/Upload.js';

const models = [Aluno, User, Upload];
const connection = new Sequelize(config);

models.forEach((model) => {
  model.init(connection);
});

models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
