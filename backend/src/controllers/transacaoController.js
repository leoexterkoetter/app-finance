const transacaoService = require('../services/transacaoService');

class TransacaoController {
  async listar(req, res) {
    try {
      const transacoes = await transacaoService.listarPorUsuario(req.params.usuario_id);
      res.json(transacoes);
    } catch (err) {
      console.error('Erro ao buscar transações:', err);
      res.status(500).json({ error: 'Erro ao buscar transações' });
    }
  }

  async criar(req, res) {
    try {
      const result = await transacaoService.criar(req.body);
      res.json({ ...result, message: 'Transação criada com sucesso' });
    } catch (err) {
      console.error('Erro ao criar transação:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async criarParcelada(req, res) {
    try {
      const result = await transacaoService.criarParcelada(req.body);
      res.json({
        ...result,
        message: `${result.quantidade} parcelas de R$ ${result.valorPorParcela} criadas com sucesso`
      });
    } catch (err) {
      console.error('Erro ao criar transação parcelada:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async atualizar(req, res) {
    try {
      await transacaoService.atualizar(req.params.id, req.body);
      res.json({ message: 'Transação atualizada com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar transação:', err);
      res.status(500).json({ error: 'Erro ao atualizar transação' });
    }
  }

  async deletar(req, res) {
    try {
      await transacaoService.deletar(req.params.id);
      res.json({ message: 'Transação deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar transação:', err);
      res.status(500).json({ error: 'Erro ao deletar transação' });
    }
  }
}

module.exports = new TransacaoController();
