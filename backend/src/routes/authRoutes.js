const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/cadastro', authController.cadastrar.bind(authController));
router.post('/login', authController.login.bind(authController));

module.exports = router;
