const contaRepository = require('../repositories/contaRepository');
const transacaoRepository = require('../repositories/transacaoRepository');
const { formatMongoDocs } = require('../utils/helpers');

class ContaService {
  async listarPorUsuario(usuarioId) {
    const contas = await contaRepository.findByUserId(usuarioId);
    return formatMongoDocs(contas);
  }

  async criar(data) {
    const conta = await contaRepository.create({
      ...data,
      limite: parseFloat(data.limite) || 0,
      saldo_atual: parseFloat(data.saldo_atual) || 0
    });

    return {
      id: conta._id.toString(),
      ...conta.toObject()
    };
  }

  async atualizar(id, data) {
    const update = { ...data };
    delete update._id;
    delete update.id;

    if (update.limite) update.limite = parseFloat(update.limite);
    if (update.saldo_atual) update.saldo_atual = parseFloat(update.saldo_atual);

    await contaRepository.update(id, update);
  }

  async deletar(id) {
    const count = await transacaoRepository.countByContaId(id);

    if (count > 0) {
      throw new Error(`Não é possível deletar. Existem ${count} transações nesta conta.`);
    }

    await contaRepository.delete(id);
  }

  async calcularSaldo(id) {
    const conta = await contaRepository.findById(id);

    if (!conta) {
      throw new Error('Conta não encontrada');
    }

    // Buscar transações não pagas
    const transacoes = await transacaoRepository.findByContaIdAndNotPaid(id);

    const totalNaoPago = transacoes.reduce((sum, t) => {
      return sum + (t.tipo === 'gasto' ? t.valor : -t.valor);
    }, 0);

    const resultado = {
      conta_id: id,
      nome: conta.nome,
      tipo: conta.tipo,
      saldo_atual: conta.saldo_atual,
      total_nao_pago: totalNaoPago,
    };

    if (conta.tipo === 'cartao_credito') {
      resultado.limite = conta.limite;
      resultado.disponivel = conta.limite - totalNaoPago;
      resultado.percentual_usado = ((totalNaoPago / conta.limite) * 100).toFixed(1);
    } else {
      resultado.saldo_disponivel = conta.saldo_atual - totalNaoPago;
    }

    return resultado;
  }
}

module.exports = new ContaService();
