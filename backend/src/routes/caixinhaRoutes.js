const express = require('express');
const router = express.Router();
const caixinhaController = require('../controllers/caixinhaController');
const { requireAuth } = require('../middlewares/auth');

router.get('/:usuario_id', caixinhaController.listar.bind(caixinhaController));
router.post('/', requireAuth, caixinhaController.criar.bind(caixinhaController));
router.put('/:id', requireAuth, caixinhaController.atualizar.bind(caixinhaController));
router.put('/:id/pagar', requireAuth, caixinhaController.pagarParcela.bind(caixinhaController));
router.delete('/:id', requireAuth, caixinhaController.deletar.bind(caixinhaController));

module.exports = router;
