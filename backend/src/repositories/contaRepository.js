const Conta = require('../models/Conta');

class ContaRepository {
  async findByUserId(usuarioId) {
    return await Conta.find({ usuario_id: usuarioId }).sort({ criado_em: -1 }).lean();
  }

  async create(data) {
    return await Conta.create(data);
  }

  async findById(id) {
    return await Conta.findById(id);
  }

  async update(id, data) {
    return await Conta.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Conta.findByIdAndDelete(id);
  }
}

module.exports = new ContaRepository();
