const express = require('express');
const router = express.Router();

const hospitalController = require('../app/controllers/HospitalController');

router.get('/create', hospitalController.index);
router.post('/stored', hospitalController.store);

module.exports = router;
