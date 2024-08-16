const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/authentication', userController.authentication);
router.get('/create', userController.create);
router.post('/stored', userController.store);
router.get('/:id/edit', userController.edit);
router.post('/handle-form-actions', userController.handleDeleteFormActions);
router.post('/handle-trash-form-actions', userController.handleTrashFormActions);
router.put('/:id', userController.update);
router.patch('/:id/restore', userController.restore);
router.delete('/:id', userController.destroy);
router.delete('/:id/force', userController.forceDestroy);

module.exports = router;
