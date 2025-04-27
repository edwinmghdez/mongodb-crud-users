const UserService = require("../services/userService");

class UserController {
  async index(req, res) {
    const users = await UserService.index();
    return res.status(200).json(users);
  }

  async show(req, res, next) {
    try {
      const user = await UserService.show(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res) {
    const data = req.body;
    const user = await UserService.store(data);
    return res.status(201).json(user);
  }

  async update(req, res, next) {
    try {
      const data = req.body;
      const user = await UserService.update(req.params.id, data);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await UserService.delete(req.params.id);
      return res.status(200).json(null);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
