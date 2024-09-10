const express = require('express');
const router = express.Router();

const hospitalController = require('../app/controllers/HospitalController');

router.get('/create', hospitalController.index);
router.get('/:id', hospitalController.getHospital);
router.post('/stored', hospitalController.store);
router.put('/:id/edit', hospitalController.edit);
router.delete('/:id/delete', hospitalController.destroy);

module.exports = router;
