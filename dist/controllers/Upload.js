"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerjs = require('../config/multer.js'); var _multerjs2 = _interopRequireDefault(_multerjs);
var _constantsjs = require('../constants/constants.js');
var _Uploadjs = require('../models/Upload.js'); var _Uploadjs2 = _interopRequireDefault(_Uploadjs);

const upload = _multer2.default.call(void 0, _multerjs2.default).single('photos');

class Upload {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(_constantsjs.HTTP_STATUS.BAD_REQUEST).json({ errors: [err.code] });
      }

      try {
        const { originalname, filename } = req.file;
        const aluno_id = req.body.aluno_id;

        await _Uploadjs2.default.create({
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
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno não existe'] });
      }
    });
  }
}

exports. default = new Upload();
