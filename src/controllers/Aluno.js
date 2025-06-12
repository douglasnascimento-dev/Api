import { HTTP_STATUS } from '../constants/constants.js';

import AlunoModel from '../models/Aluno.js';
import UploadModel from '../models/Upload.js';

class Aluno {
  async index(req, res) {
    const alunos = await AlunoModel.findAll({
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
        [UploadModel, 'id', 'DESC'],
      ],
      include: {
        model: UploadModel,
        attributes: ['id', 'filename', 'url'],
      },
    });

    return res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await AlunoModel.create(req.body);

      return res.json(aluno);
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

      const aluno = await AlunoModel.findByPk(id, {
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
          [UploadModel, 'id', 'DESC'],
        ],
        include: {
          model: UploadModel,
          attributes: ['id', 'filename', 'url'],
        },
      });

      if (!aluno) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno does not exist'] });
      }

      return res.json(aluno);
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

      const aluno = await AlunoModel.findByPk(id);

      if (!aluno) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
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

      const aluno = await AlunoModel.findByPk(id);

      if (!aluno) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .json({ errors: ['Aluno does not exist'] });
      }

      aluno.destroy();

      return res.json(`O Aluno ${id} foi excluído com sucesso`);
    } catch (e) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new Aluno();
