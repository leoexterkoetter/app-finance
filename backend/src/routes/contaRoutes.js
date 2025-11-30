const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');
const { requireAuth } = require('../middlewares/auth');

router.get('/:usuario_id', contaController.listar.bind(contaController));
router.post('/', requireAuth, contaController.criar.bind(contaController));
router.put('/:id', requireAuth, contaController.atualizar.bind(contaController));
router.delete('/:id', requireAuth, contaController.deletar.bind(contaController));
router.get('/:id/saldo', contaController.calcularSaldo.bind(contaController));

module.exports = router;
