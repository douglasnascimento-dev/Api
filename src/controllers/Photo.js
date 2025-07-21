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
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['O ID do estudante é obrigatório.'] });
    }

    const student = await StudentModel.findByPk(studentId);

    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Estudante não encontrado.'] });
    }

    const { originalname, filename } = req.file;

    const photo = await PhotoModel.create({
      originalname,
      filename,
      studentId,
    });

    return res.status(HTTP_STATUS.CREATED).json(photo);
  }
}

export default new PhotoController();
