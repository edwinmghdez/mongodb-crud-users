const customException = require("../exceptions/customException");
const User = require("../models/userModel");

class UserRepository {
  async index() {
    return await User.find();
  }

  async show(id) {
    const user = await User.findById(id);

    if (!user) {
      throw new customException("User not found", 404);
    }

    return user;
  }

  async store(payload) {
    return await User.create(payload);
  }

  async update(id, payload) {
    const user = await User.findByIdAndUpdate(id, payload);

    if (!user) {
      throw new customException("User not found", 404);
    }

    return await User.findById(user.id);
  }

  async delete(id) {
    const user = await User.findById(id);

    if (!user) {
      throw new customException("User not found", 404);
    }

    return await user.deleteOne();
  }
}

module.exports = new UserRepository();
