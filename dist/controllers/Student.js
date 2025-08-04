"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _httpjs = require('../constants/http.js');
var _Studentjs = require('../models/Student.js'); var _Studentjs2 = _interopRequireDefault(_Studentjs);
var _Photojs = require('../models/Photo.js'); var _Photojs2 = _interopRequireDefault(_Photojs);

class StudentController {
  async index(req, res) {
    const students = await _Studentjs2.default.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'ASC'], [_Photojs2.default, 'id', 'DESC']],
      include: {
        model: _Photojs2.default,
        attributes: ['id', 'filename', 'url'],
      },
    });

    return res.json(students);
  }

  async store(req, res) {
    const { name, surname, email, age, weight, height } = req.body;

    const student = await _Studentjs2.default.create({
      name,
      surname,
      email,
      age,
      weight,
      height,
    });

    return res.status(_httpjs.HTTP_STATUS.CREATED).json(student);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await _Studentjs2.default.findByPk(id, {
      attributes: ['id', 'name', 'surname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'ASC'], [_Photojs2.default, 'id', 'DESC']],
      include: {
        model: _Photojs2.default,
        attributes: ['id', 'filename', 'url'],
      },
    });

    if (!student) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Student not found'] });
    }

    return res.json(student);
  }

  async update(req, res) {
    const { id } = req.params;
    const student = await _Studentjs2.default.findByPk(id);

    if (!student) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Student not found'] });
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
    const student = await _Studentjs2.default.findByPk(id);

    if (!student) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Student not found'] });
    }

    await student.destroy();

    return res.json({ message: `Student ${id} was successfully deleted.` });
  }
}

exports. default = new StudentController();
