const Categoria = require('../models/Categoria');

class CategoriaRepository {
  async findByUserId(usuarioId) {
    return await Categoria.find({ usuario_id: usuarioId }).sort({ criado_em: -1 }).lean();
  }

  async findByUserIdAndName(usuarioId, nome) {
    return await Categoria.findOne({ usuario_id: usuarioId, nome });
  }

  async create(data) {
    return await Categoria.create(data);
  }

  async update(id, data) {
    return await Categoria.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Categoria.findByIdAndDelete(id);
  }
}

module.exports = new CategoriaRepository();
