const contaService = require('../services/contaService');

class ContaController {
  async listar(req, res) {
    try {
      const contas = await contaService.listarPorUsuario(req.params.usuario_id);
      res.json(contas);
    } catch (err) {
      console.error('Erro ao buscar contas:', err);
      res.status(500).json({ error: 'Erro ao buscar contas' });
    }
  }

  async criar(req, res) {
    try {
      const result = await contaService.criar(req.body);
      res.json({ ...result, message: 'Conta criada com sucesso' });
    } catch (err) {
      console.error('Erro ao criar conta:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async atualizar(req, res) {
    try {
      await contaService.atualizar(req.params.id, req.body);
      res.json({ message: 'Conta atualizada com sucesso' });
    } catch (err) {
      console.error('Erro ao editar conta:', err);
      res.status(500).json({ error: 'Erro ao editar conta' });
    }
  }

  async deletar(req, res) {
    try {
      await contaService.deletar(req.params.id);
      res.json({ message: 'Conta deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar conta:', err);
      
      if (err.message.includes('transações nesta conta')) {
        return res.status(400).json({ error: err.message });
      }
      
      res.status(500).json({ error: 'Erro ao deletar conta' });
    }
  }

  async calcularSaldo(req, res) {
    try {
      const resultado = await contaService.calcularSaldo(req.params.id);
      res.json(resultado);
    } catch (err) {
      console.error('Erro ao calcular saldo:', err);
      
      if (err.message === 'Conta não encontrada') {
        return res.status(404).json({ error: err.message });
      }
      
      res.status(500).json({ error: 'Erro ao calcular saldo' });
    }
  }
}

module.exports = new ContaController();
