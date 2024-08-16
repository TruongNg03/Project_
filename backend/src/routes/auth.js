const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/register', authController.index);
router.post('/register', authController.register);
router.get('/login', authController.renderLogin);
router.post('/login', authController.login);

module.exports = router;
