const authService = require('../services/authService');

class AuthController {
  async cadastrar(req, res) {
    try {
      const result = await authService.cadastrar(req.body);
      res.json({ ...result, message: 'Usuário cadastrado com sucesso' });
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      
      if (err.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: err.message });
      }
      if (err.message === 'Senha incorreta') {
        return res.status(401).json({ error: err.message });
      }
      
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}

module.exports = new AuthController();
