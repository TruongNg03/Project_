const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// user
router.put('/:id', userController.update);

// admin
router.post('/handle-form-actions', userController.handleDeleteFormActions);
router.post('/handle-trash-form-actions', userController.handleTrashFormActions);
router.patch('/:id/restore', userController.restore);
router.delete('/:id', userController.destroy);
router.delete('/:id/force', userController.forceDestroy);

module.exports = router;
