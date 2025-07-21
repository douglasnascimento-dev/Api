import multer from 'multer';

import multerConfig from '../config/multer.js';
import { HTTP_STATUS } from '../constants/http.js';
import PhotoModel from '../models/Photo.js';

const upload = multer(multerConfig).single('photo');

class Photo {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: [err.code] });
      }

      try {
        const { originalname, filename } = req.file;
        const studentId = req.body.studentId;

        await PhotoModel.create({
          originalname,
          filename,
          studentId,
        });

        return res.json({
          originalname,
          filename,
          studentId,
        });
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Student not found'] });
      }
    });
  }
}

export default new Photo();
