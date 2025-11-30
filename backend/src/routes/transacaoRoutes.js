const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');
const { requireAuth } = require('../middlewares/auth');

router.get('/:usuario_id', transacaoController.listar.bind(transacaoController));
router.post('/', requireAuth, transacaoController.criar.bind(transacaoController));
router.post('/parcelada', requireAuth, transacaoController.criarParcelada.bind(transacaoController));
router.put('/:id', requireAuth, transacaoController.atualizar.bind(transacaoController));
router.delete('/:id', requireAuth, transacaoController.deletar.bind(transacaoController));

module.exports = router;
