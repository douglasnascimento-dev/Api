"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _constantsjs = require('../constants/constants.js');

var _Alunojs = require('../models/Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);
var _Uploadjs = require('../models/Upload.js'); var _Uploadjs2 = _interopRequireDefault(_Uploadjs);

class Aluno {
  async index(req, res) {
    const alunos = await _Alunojs2.default.findAll({
      attributes: [
        'id',
        'nome',
        'sobrenome',
        'email',
        'idade',
        'peso',
        'altura',
      ],
      order: [
        ['id', 'ASC'],
        [_Uploadjs2.default, 'id', 'DESC'],
      ],
      include: {
        model: _Uploadjs2.default,
        attributes: ['id', 'filename', 'url'],
      },
    });

    return res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await _Alunojs2.default.create(req.body);

      return res.json(aluno);
    } catch (e) {
      const errors = _optionalChain([e, 'access', _ => _.errors, 'optionalAccess', _2 => _2.map, 'call', _3 => _3((err) => err.message)]) || [e.message];

      return res.status(_constantsjs.HTTP_STATUS.BAD_REQUEST).json({ errors });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['ID not provided'] });
      }

      const aluno = await _Alunojs2.default.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [
          ['id', 'ASC'],
          [_Uploadjs2.default, 'id', 'DESC'],
        ],
        include: {
          model: _Uploadjs2.default,
          attributes: ['id', 'filename', 'url'],
        },
      });

      if (!aluno) {
        return res
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno does not exist'] });
      }

      return res.json(aluno);
    } catch (e) {
      return res
        .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['ID not provided'] });
      }

      const aluno = await _Alunojs2.default.findByPk(id);

      if (!aluno) {
        return res
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno does not exist'] });
      }

      const newAluno = await aluno.update(req.body);

      return res.json({
        nome: newAluno.nome,
        sobrenome: newAluno.sobrenome,
        email: newAluno.email,
        idade: newAluno.idade,
        peso: newAluno.peso,
        altura: newAluno.altura,
      });
    } catch (e) {
      return res
        .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['ID not provided'] });
      }

      const aluno = await _Alunojs2.default.findByPk(id);

      if (!aluno) {
        return res
          .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno does not exist'] });
      }

      aluno.destroy();

      return res.json(`O Aluno ${id} foi excluído com sucesso`);
    } catch (e) {
      return res
        .status(_constantsjs.HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

exports. default = new Aluno();
