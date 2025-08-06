"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _httpjs = require('../constants/http.js');
var _Photojs = require('../models/Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);
var _Studentjs = require('../models/Student.js'); var _Studentjs2 = _interopRequireDefault(_Studentjs);

class PhotoController {
  async store(req, res) {
    if (!req.file) {
      return res.status(_httpjs.HTTP_STATUS.BAD_REQUEST).json({ errors: ['Nenhum arquivo enviado.'] });
    }

    const { studentId } = req.body;

    if (!studentId) {
      return res.status(_httpjs.HTTP_STATUS.BAD_REQUEST).json({ errors: ['ID do aluno é obrigatório.'] });
    }

    const student = await _Studentjs2.default.findByPk(studentId);

    if (!student) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Aluno não encontrado.'] });
    }

    const { originalname, filename } = req.file;

    const photo = await _Photojs2.default.create({
      originalname,
      filename,
      studentId,
    });

    return res.status(_httpjs.HTTP_STATUS.CREATED).json(photo);
  }

  async delete(req, res) {
    const { studentId, photoId } = req.params;

    const photo = await _Photojs2.default.findOne({
      where: {
        id: photoId,
        student_id: studentId,
      },
    });

    if (photo) {
      await photo.destroy();

      return res.json({ message: 'Foto removida com sucesso.' });
    }

    return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Foto não encontrada para este aluno.'] });
  }

  async deleteAll(req, res) {
    const { studentId } = req.params;

    const deletedCount = await _Photojs2.default.destroy({
      where: {
        student_id: studentId,
      },
    });

    if (deletedCount === 0) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({
        errors: ['Nenhuma foto encontrada para este aluno.'],
      });
    }

    return res.json({ message: `${deletedCount} foto(s) removida(s) com sucesso.` });
  }
}

exports. default = new PhotoController();
