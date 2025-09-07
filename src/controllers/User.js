import User from '../models/User.js';
import { HTTP_STATUS } from '../constants/http.js';

class UserController {
  async store(req, res) {
    const { name, email, password } = req.body;

    const newUser = await User.create({ name, email, password });

    const { id, name: userName, email: userEmail } = newUser;

    return res.status(HTTP_STATUS.CREATED).json({ id, name: userName, email: userEmail });
  }

  async show(req, res) {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'],
    });

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
    }

    return res.json(user);
  }

  async update(req, res) {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
    }

    const { name, email } = req.body;

console.log(name, email);
    const updatedUser = await user.update({ name, email });

    const { id, name: newName, email: newEmail } = updatedUser;

    return res.json({ id, name: newName, email: newEmail });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
    }

    await user.destroy();

    return res.json({ message: 'Sua conta foi excluída com sucesso.' });
  }
}

export default new UserController();
