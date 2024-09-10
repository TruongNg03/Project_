const express = require('express');
const router = express.Router();

const bloodController = require('../app/controllers/BloodController');

router.get('/create', bloodController.create);
router.get('/:id', bloodController.getBlood);
router.post('/stored', bloodController.store);
router.put('/:id/edit', bloodController.edit);
router.delete('/:id/delete', bloodController.destroy);

module.exports = router;
