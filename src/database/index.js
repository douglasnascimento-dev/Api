import Sequelize from 'sequelize';

import config from '../config/database.js';
import Student from '../models/Student.js';
import User from '../models/User.js';
import Photo from '../models/Photo.js';

const models = [Student, User, Photo];
const connection = new Sequelize(config);

models.forEach((model) => {
  model.init(connection);
});

models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
