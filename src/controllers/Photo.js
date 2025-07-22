import { HTTP_STATUS } from '../constants/http.js';
import PhotoModel from '../models/Photo.js';
import StudentModel from '../models/Student.js';

class PhotoController {
  async store(req, res) {
    if (!req.file) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['No file uploaded.'] });
    }

    const { studentId } = req.body;

    if (!studentId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['Student ID is required.'] });
    }

    const student = await StudentModel.findByPk(studentId);

    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Student not found.'] });
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
        student_id: studentId,
      },
    });

    if (photo) {
      await photo.destroy();

      return res.json({ message: 'Photo deleted successfully.' });
    }

    return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Photo not found for this student.'] });
  }

  async deleteAll(req, res) {
    const { studentId } = req.params;

    const deletedCount = await PhotoModel.destroy({
      where: {
        student_id: studentId,
      },
    });

    if (deletedCount === 0) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        errors: ['No photos found for this student.'],
      });
    }

    return res.json({ message: `${deletedCount} photo(s) deleted successfully.` });
  }
}

export default new PhotoController();
