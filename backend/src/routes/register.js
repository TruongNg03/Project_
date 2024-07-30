const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/RegisterController');

router.get('/register', registerController.index);
router.post('/register', registerController.registerUser);

module.exports = router;
