const Usuario = require('../models/Usuario');

class AuthRepository {
  async findByEmail(email) {
    return await Usuario.findOne({ email });
  }

  async create(userData) {
    return await Usuario.create(userData);
  }
}

module.exports = new AuthRepository();
