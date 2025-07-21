import multer from 'multer';
import { extname, resolve } from 'path';

// eslint-disable-next-line no-magic-numbers
const aleatoria = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/svg'
    ) {
      return cb(new multer.MulterError('Arquivo precisa ser do tipo imagem'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatoria()}${extname(file.originalname)}`);
    },
  }),
};
