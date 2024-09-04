const express = require('express');
const router = express.Router();

const backgroundController = require('../app/controllers/BackgroundController');

router.get('/', backgroundController.getBackground);

module.exports = router;
