const express = require('express');
const router = express.Router();

const bloodController = require('../app/controllers/BloodController');

router.get('/create', bloodController.create);
router.post('/stored', bloodController.store);

module.exports = router;
