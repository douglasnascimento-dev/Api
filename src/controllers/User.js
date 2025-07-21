import User from '../models/User.js';
import { HTTP_STATUS } from '../constants/http.js';

class UserController {
  async store(req, res) {
    let newUser;

    try {
      newUser = await User.create(req.body);
    } catch (error) {

      if (error.errors && Array.isArray(error.errors)) {
        const errorMessages = error.errors.map((err) => err.message);

        return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errorMessages });
      }

      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        errors: [error.message || 'An error occurred while creating the user.'],
      });
    }

    const { id, name, email } = newUser;

    return res.json({ id, name, email });
  }

  async show(req, res) {
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

    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['User ID not provided.'] });
    }

    try {
      user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'],
      });

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['User not found.'] });

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

    if (!id) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: ['User ID not provided'] });
    }

    try {
      user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'],
      });

      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ errors: ['User not found'] });
      }

      await user.destroy();
    } catch (error) {
      return res.json({ errors: error.errors.map((err) => err.message) });
    }

    return res.status(HTTP_STATUS.OK).json({ id: user.id });
  }
}

export default new UserController();
