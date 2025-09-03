import { HTTP_STATUS } from '../constants/http.js';
import PhotoModel from '../models/Photo.js';
import StudentModel from '../models/Student.js';

class PhotoController {
  async store(req, res) {
    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['Nenhum arquivo enviado.'] });
    }

    const { studentId } = req.body;

    if (!studentId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['ID do aluno é obrigatório.'] });
    }

    const student = await StudentModel.findByPk(studentId);

    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Aluno não encontrado.'] });
    }

    const { originalname, filename } = req.file;

    const photo = await PhotoModel.create({
      originalname,
      filename,
      studentId,
    });

    return res.status(HTTP_STATUS.CREATED).json(photo);
  }

  async delete(req, res) {
    const { studentId, photoId } = req.params;

    const photo = await PhotoModel.findOne({
      where: {
        id: photoId,
        studentId,
      },
    });

    if (photo) {
      await photo.destroy();

      return res.json({ message: 'Foto removida com sucesso.' });
    }

    return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Foto não encontrada para este aluno.'] });
  }

  async deleteAll(req, res) {
    const { studentId } = req.params;

    const deletedCount = await PhotoModel.destroy({
      where: {
         studentId,
      },
    });

    if (deletedCount === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        errors: ['Nenhuma foto encontrada para este aluno.'],
      });
    }

    return res.json({ message: `${deletedCount} foto(s) removida(s) com sucesso.` });
  }
}

export default new PhotoController();
