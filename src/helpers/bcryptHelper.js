const bcrypt = require("bcrypt");
const saltRounds = 12;

class BcryptHelper {
  async encryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
  }
}

module.exports = new BcryptHelper();
