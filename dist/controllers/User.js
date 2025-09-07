"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Userjs = require('../models/User.js'); var _Userjs2 = _interopRequireDefault(_Userjs);
var _httpjs = require('../constants/http.js');

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const newUser = await _Userjs2.default.create({ name, email, password });

    const { id, name: userName, email: userEmail } = newUser;

    return res.status(_httpjs.HTTP_STATUS.CREATED).json({ id, name: userName, email: userEmail });
  }

  async show(req, res) {
    const user = await _Userjs2.default.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
    }

    return res.json(user);
  }

  async update(req, res) {
    const user = await _Userjs2.default.findByPk(req.user.id);

    if (!user) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
    }

    const { name, email } = req.body;

    const updatedUser = await user.update({ name, email });

    const { id, name: newName, email: newEmail } = updatedUser;

    return res.json({ id, name: newName, email: newEmail });
  }

  async delete(req, res) {
    const user = await _Userjs2.default.findByPk(req.userId);

    if (!user) {
      return res.status(_httpjs.HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
    }

    await user.destroy();

    return res.json({ message: 'Sua conta foi excluída com sucesso.' });
  }
}

exports. default = new UserController();
