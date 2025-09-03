import { HTTP_STATUS } from '../constants/http.js';
import StudentModel from '../models/Student.js';

class StudentController {
  async index(req, res) {
    const students = await StudentModel.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'ASC'], ['photos', 'id', 'DESC']],
      include: {
        association: 'photos',
        attributes: ['id', 'filename', 'url'],
      },
    });

    return res.json(students);
  }

  async store(req, res) {
    const { name, surname, email, age, weight, height } = req.body;
    const student = await StudentModel.create({
      name,
      surname,
      email,
      age,
      weight,
      height,
    });

    return res.status(HTTP_STATUS.CREATED).json(student);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await StudentModel.findByPk(id, {
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'ASC'], ['photos', 'id', 'DESC']],
      include: {
        association: 'photos',
        attributes: ['id', 'filename', 'url'],
      },
    });

    if (!student) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ errors: ['Aluno não encontrado.'] });
    }

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await StudentModel.findByPk(id);

    if (!student) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ errors: ['Aluno não encontrado.'] });
    }

    const { name, surname, email, age, weight, height } = req.body;
    const updatedStudent = await student.update({
      name,
      surname,
      email,
      age,
      weight,
      height,
    });

    return res.json(updatedStudent);
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await StudentModel.findByPk(id);

    if (!student) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ errors: ['Aluno não encontrado.'] });
    }

    await student.destroy();

    return res.json({ message: `Aluno ${id} foi removido com sucesso.` });
  }
}

export default new StudentController();
