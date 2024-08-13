const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/register', authController.index);
router.post('/stored', authController.register);

module.exports = router;
