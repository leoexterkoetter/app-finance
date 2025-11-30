const caixinhaRepository = require('../repositories/caixinhaRepository');
const { formatMongoDocs } = require('../utils/helpers');

class CaixinhaService {
  async listarPorUsuario(usuarioId) {
    const caixinhas = await caixinhaRepository.findByUserId(usuarioId);
    return formatMongoDocs(caixinhas);
  }

  async criar(data) {
    const caixinha = await caixinhaRepository.create({
      ...data,
      valor_total: parseFloat(data.valor_total),
      parcelas_total: parseInt(data.parcelas_total)
    });

    return { id: caixinha._id.toString() };
  }

  async atualizar(id, data) {
    const update = { ...data };
    delete update._id;
    delete update.id;

    if (update.valor_total) update.valor_total = parseFloat(update.valor_total);
    if (update.valor_pago) update.valor_pago = parseFloat(update.valor_pago);
    if (update.parcelas_total) update.parcelas_total = parseInt(update.parcelas_total);
    if (update.parcelas_pagas) update.parcelas_pagas = parseInt(update.parcelas_pagas);

    await caixinhaRepository.update(id, update);
  }

  async pagarParcela(id, valor) {
    const caixinha = await caixinhaRepository.findById(id);

    if (!caixinha) {
      throw new Error('Caixinha não encontrada');
    }

    caixinha.valor_pago += parseFloat(valor);
    caixinha.parcelas_pagas += 1;
    await caixinha.save();

    return {
      valor_pago: caixinha.valor_pago,
      parcelas_pagas: caixinha.parcelas_pagas
    };
  }

  async deletar(id) {
    await caixinhaRepository.delete(id);
  }
}

module.exports = new CaixinhaService();
