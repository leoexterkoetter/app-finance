const categoriaService = require('../services/categoriaService');

class CategoriaController {
  async listar(req, res) {
    try {
      const categorias = await categoriaService.listarPorUsuario(req.params.usuario_id);
      res.json(categorias);
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  async criar(req, res) {
    try {
      const result = await categoriaService.criar(req.body);
      res.json({ ...result, message: 'Categoria criada com sucesso' });
    } catch (err) {
      console.error('Erro ao criar categoria:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async atualizar(req, res) {
    try {
      await categoriaService.atualizar(req.params.id, req.body);
      res.json({ message: 'Categoria atualizada com sucesso' });
    } catch (err) {
      console.error('Erro ao editar categoria:', err);
      res.status(500).json({ error: 'Erro ao editar categoria' });
    }
  }

  async deletar(req, res) {
    try {
      await categoriaService.deletar(req.params.id);
      res.json({ message: 'Categoria deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar categoria:', err);
      
      if (err.message.includes('transações usando')) {
        return res.status(400).json({ error: err.message });
      }
      
      res.status(500).json({ error: 'Erro ao deletar categoria' });
    }
  }
}

module.exports = new CategoriaController();
