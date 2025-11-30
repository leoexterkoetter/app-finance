const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const transacaoRoutes = require('./transacaoRoutes');
const caixinhaRoutes = require('./caixinhaRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const contaRoutes = require('./contaRoutes');

// Rota raiz da API
router.get('/', (req, res) => {
  res.json({
    message: '🚀 API Finance App rodando!',
    versao: '3.0-restructured',
    endpoints: {
      transacoes: '/api/transacoes/:usuario_id',
      caixinhas: '/api/caixinhas/:usuario_id',
      categorias: '/api/categorias/:usuario_id',
      contas: '/api/contas/:usuario_id',
      login: '/api/login',
      cadastro: '/api/cadastro'
    }
  });
});

// Registrar rotas
router.use('/', authRoutes);
router.use('/transacoes', transacaoRoutes);
router.use('/caixinhas', caixinhaRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/contas', contaRoutes);

module.exports = router;
