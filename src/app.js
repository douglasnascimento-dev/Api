import express from 'express';
import dotenv from 'dotenv';
import {resolve} from 'path';

import homeRoutes from './routes/home.js';
import userRoutes from './routes/user.js';
import tokenRoutes from './routes/token.js';
import alunoRoutes from './routes/aluno.js';
import uploadRoutes from './routes/upload.js';

import './database/index.js';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/api/upload', uploadRoutes);
  }
}

export default new App().app;
