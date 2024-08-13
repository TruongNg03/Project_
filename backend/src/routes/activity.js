const express = require('express');
const router = express.Router();

const activityController = require('../app/controllers/ActivityController');

router.get('/create', activityController.create);
router.post('/stored', activityController.store);
router.patch('/:id/restore', activityController.restore);
router.delete('/:id', activityController.destroy);
router.delete('/:id/force', activityController.forceDestroy);

module.exports = router;
