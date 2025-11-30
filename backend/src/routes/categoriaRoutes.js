const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { requireAuth } = require('../middlewares/auth');

router.get('/:usuario_id', categoriaController.listar.bind(categoriaController));
router.post('/', requireAuth, categoriaController.criar.bind(categoriaController));
router.put('/:id', requireAuth, categoriaController.atualizar.bind(categoriaController));
router.delete('/:id', requireAuth, categoriaController.deletar.bind(categoriaController));

module.exports = router;
