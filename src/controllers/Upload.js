import multer from 'multer';

import multerConfig from '../config/multer.js';
import { HTTP_STATUS } from '../constants/constants.js';
import UploadModel from '../models/Upload.js';

const upload = multer(multerConfig).single('photos');

class Upload {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: [err.code] });
      }

      try {
        const { originalname, filename } = req.file;
        const aluno_id = req.body.aluno_id;

        await UploadModel.create({
          originalname,
          filename,
          aluno_id,
        });

        return res.json({
          originalname,
          filename,
          aluno_id,
        });
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno não existe'] });
      }
    });
  }
}

export default new Upload();
