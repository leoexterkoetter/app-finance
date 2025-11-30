const Caixinha = require('../models/Caixinha');

class CaixinhaRepository {
  async findByUserId(usuarioId) {
    return await Caixinha.find({ usuario_id: usuarioId }).sort({ criado_em: -1 }).lean();
  }

  async create(data) {
    return await Caixinha.create(data);
  }

  async findById(id) {
    return await Caixinha.findById(id);
  }

  async update(id, data) {
    return await Caixinha.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Caixinha.findByIdAndDelete(id);
  }
}

module.exports = new CaixinhaRepository();
