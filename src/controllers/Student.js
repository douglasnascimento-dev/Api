import { HTTP_STATUS } from '../constants/http.js';

import StudentModel from '../models/Student.js';
import PhotoModel from '../models/Photo.js';

class Student {
  async index(req, res) {
    const students  = await StudentModel.findAll({
      attributes: [
        'id',
        'name',
        'surname',
        'email',
        'age',
        'weight',
        'height',
      ],
      order: [
        ['id', 'ASC'],
        [PhotoModel, 'id', 'DESC'],
      ],
      include: {
        model: PhotoModel,
        attributes: ['id', 'filename', 'url'],
      },
    });

    return res.json(students );
  }

  async store(req, res) {

    try {
      const student = await StudentModel.create(req.body);

      return res.json(student);
    } catch (e) {
      const errors = e.errors?.map((err) => err.message) || [e.message];

      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['ID not provided'] });
      }

      const student = await StudentModel.findByPk(id, {
        attributes: [
          'id',
          'name',
          'surname',
          'email',
          'age',
          'weight',
          'height',
        ],
        order: [
          ['id', 'ASC'],
          [PhotoModel, 'id', 'DESC'],
        ],
        include: {
          model: PhotoModel,
          attributes: ['id', 'filename', 'url'],
        },
      });

      if (!student) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Student does not exist'] });
      }

      return res.json(student);
    } catch (e) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['ID not provided'] });
      }

      const student = await StudentModel.findByPk(id);

      if (!student) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Student does not exist'] });
      }

      const newStudent = await student.update(req.body);

      return res.json({
        name: newStudent.name,
        surname: newStudent.surname,
        email: newStudent.email,
        age: newStudent.age,
        weight: newStudent.weight,
        height: newStudent.height,
      });
    } catch (e) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['ID not provided'] });
      }

      const student = await StudentModel.findByPk(id);

      if (!student) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Student does not exist'] });
      }

      student.destroy();

      return res.json(`Student ${id} was successfully deleted`);
    } catch (e) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new Student();
