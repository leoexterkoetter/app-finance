const Transacao = require('../models/Transacao');

class TransacaoRepository {
  async findByUserId(usuarioId) {
    return await Transacao.find({ usuario_id: usuarioId }).sort({ data: -1 }).lean();
  }

  async create(data) {
    return await Transacao.create(data);
  }

  async createMany(dataArray) {
    return await Transacao.insertMany(dataArray);
  }

  async findById(id) {
    return await Transacao.findById(id);
  }

  async update(id, data) {
    return await Transacao.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Transacao.findByIdAndDelete(id);
  }

  async countByContaId(contaId) {
    return await Transacao.countDocuments({ conta_id: contaId });
  }

  async countByCategoriaId(categoriaId) {
    return await Transacao.countDocuments({ categoria_custom_id: categoriaId });
  }

  async findByContaIdAndNotPaid(contaId) {
    return await Transacao.find({ conta_id: contaId, pago: false }).lean();
  }
}

module.exports = new TransacaoRepository();
