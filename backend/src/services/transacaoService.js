const transacaoRepository = require('../repositories/transacaoRepository');
const { formatMongoDocs } = require('../utils/helpers');
const { MAX_VALOR } = require('../config/constants');

class TransacaoService {
  async listarPorUsuario(usuarioId) {
    const transacoes = await transacaoRepository.findByUserId(usuarioId);
    return formatMongoDocs(transacoes);
  }

  async criar(data) {
    const valor = parseFloat(data.valor);
    
    if (valor > MAX_VALOR) {
      throw new Error(`Valor não pode exceder R$ ${MAX_VALOR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    }

    const transacao = await transacaoRepository.create({
      ...data,
      valor,
      fixo: Boolean(data.fixo),
      pago: Boolean(data.pago)
    });

    return { id: transacao._id.toString() };
  }

  async criarParcelada(data) {
    const { usuario_id, valor, categoria, tipo, data: dataInicio, descricao, fixo, parcelas } = data;
    
    const valorTotal = parseFloat(valor);
    const numeroParcelas = parseInt(parcelas);
    const valorPorParcela = valorTotal / numeroParcelas;

    if (valorTotal > MAX_VALOR) {
      throw new Error(`Valor total não pode exceder R$ ${MAX_VALOR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
    }

    const dataInicial = new Date(dataInicio);
    const transacoes = [];

    for (let i = 0; i < numeroParcelas; i++) {
      const dataTransacao = new Date(dataInicial);
      dataTransacao.setMonth(dataTransacao.getMonth() + i);

      transacoes.push({
        usuario_id,
        valor: parseFloat(valorPorParcela.toFixed(2)),
        categoria,
        tipo,
        data: dataTransacao.toISOString().slice(0, 10),
        descricao: descricao ? `${descricao} (${i + 1}/${numeroParcelas})` : `Parcela ${i + 1}/${numeroParcelas}`,
        fixo: Boolean(fixo),
        pago: false,
        parcelas: numeroParcelas,
        parcela_atual: i + 1
      });
    }

    const result = await transacaoRepository.createMany(transacoes);

    return {
      ids: result.map(t => t._id.toString()),
      quantidade: numeroParcelas,
      valorPorParcela: valorPorParcela.toFixed(2),
      valorTotal: valorTotal.toFixed(2)
    };
  }

  async atualizar(id, data) {
    const update = { ...data };
    delete update._id;
    delete update.id;

    if (update.valor) update.valor = parseFloat(update.valor);
    if (update.fixo !== undefined) update.fixo = Boolean(update.fixo);
    if (update.pago !== undefined) update.pago = Boolean(update.pago);

    await transacaoRepository.update(id, update);
  }

  async deletar(id) {
    await transacaoRepository.delete(id);
  }
}

module.exports = new TransacaoService();
