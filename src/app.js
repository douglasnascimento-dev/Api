import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import cors from 'cors';
import helmet from 'helmet';

import homeRoutes from './routes/home.js';
import userRoutes from './routes/user.js';
import tokenRoutes from './routes/token.js';
import studentRoutes from './routes/student.js';
import photoRoutes from './routes/photo.js';

import './database/index.js';

const whiteList = [
  'https://projeto1.douglasnascimento.dev.br',
  'http://localhost:5173'
];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/images', express.static(resolve(__dirname, '..', 'photo', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/students', studentRoutes);
    this.app.use('/api/photo', photoRoutes);
  }
}

export default new App().app;
