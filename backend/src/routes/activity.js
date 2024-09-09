const express = require('express');
const router = express.Router();

const activityController = require('../app/controllers/ActivityController');

router.get('/create', activityController.create);
router.post('/create', activityController.store);
router.get('/:id/edit', activityController.edit);
router.post('/handle-form-actions', activityController.handleDeleteFormActions);
router.post('/handle-trash-form-actions', activityController.handleTrashFormActions);
router.put('/:id', activityController.update);
router.patch('/:id/restore', activityController.restore);
router.delete('/:id', activityController.destroy);
router.delete('/:id/force', activityController.forceDestroy);

module.exports = router;
