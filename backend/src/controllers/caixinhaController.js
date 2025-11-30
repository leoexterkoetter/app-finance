const caixinhaService = require('../services/caixinhaService');

class CaixinhaController {
  async listar(req, res) {
    try {
      const caixinhas = await caixinhaService.listarPorUsuario(req.params.usuario_id);
      res.json(caixinhas);
    } catch (err) {
      console.error('Erro ao buscar caixinhas:', err);
      res.status(500).json({ error: 'Erro ao buscar caixinhas' });
    }
  }

  async criar(req, res) {
    try {
      const result = await caixinhaService.criar(req.body);
      res.json({ ...result, message: 'Caixinha criada com sucesso' });
    } catch (err) {
      console.error('Erro ao criar caixinha:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async atualizar(req, res) {
    try {
      await caixinhaService.atualizar(req.params.id, req.body);
      res.json({ message: 'Caixinha atualizada com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar caixinha:', err);
      res.status(500).json({ error: 'Erro ao atualizar caixinha' });
    }
  }

  async pagarParcela(req, res) {
    try {
      const result = await caixinhaService.pagarParcela(req.params.id, req.body.valor);
      res.json({
        message: 'Parcela paga com sucesso',
        ...result
      });
    } catch (err) {
      console.error('Erro ao pagar parcela:', err);
      
      if (err.message === 'Caixinha não encontrada') {
        return res.status(404).json({ error: err.message });
      }
      
      res.status(500).json({ error: 'Erro ao pagar parcela' });
    }
  }

  async deletar(req, res) {
    try {
      await caixinhaService.deletar(req.params.id);
      res.json({ message: 'Caixinha deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar caixinha:', err);
      res.status(500).json({ error: 'Erro ao deletar caixinha' });
    }
  }
}

module.exports = new CaixinhaController();
