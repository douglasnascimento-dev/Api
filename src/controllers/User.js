import User from '../models/User.js';
import { HTTP_STATUS } from '../constants/constants.js';

class UserController {
  async store(req, res) {
    let novoUser;

    try {
        novoUser = await User.create(req.body);
    } catch (error) {
      return res.status( HTTP_STATUS.BAD_REQUEST ).json({ errors: error.errors.map((err) => err.message) });
    }

    const { id, name, email } = novoUser;

    return res.json({ id, name, email });
  }

  async show(req, res){
    const id = req.user.id;
    let user;

    try {
      user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'],
      });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.json(null);
    }

    return res.json(user);
  }

  async update(req, res) {
    console.log(req.body, req.user);
    const id = req.user.id;
    let user;

    if(!id){
      return res.status( HTTP_STATUS.BAD_REQUEST ).json({ errors: ['ID do usuário não informado.'] });
    }

    try {
      user = await User.findByPk(id , {
        attributes: ['id', 'name', 'email'],
      });

      if (!user) {
          return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
      }

      await user.update(req.body);
    } catch (error) {
      return res.json({ errors: error.errors.map((err) => err.message) });
    }

    return res.json(user);
  }

  async delete(req, res) {
    const id = req.user.id;
    let user;

    if(!id){
      return res.status( HTTP_STATUS.BAD_REQUEST ).json({ errors: ['ID do usuário não informado.'] });
    }

    try {
      user = await User.findByPk(id , {
        attributes: ['id', 'name', 'email'],
      });

      if (!user) {
          return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['Usuário não encontrado.'] });
      }

      await user.destroy();
    } catch (error) {
      return res.json({ errors: error.errors.map((err) => err.message) });
    }

    return res.status(HTTP_STATUS.OK).json({ id: user.id });
  }
}

export default new UserController();
