const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/login', loginController.index);
router.post('/login', loginController.loginUser);

module.exports = router;
