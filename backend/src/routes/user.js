const express = require('express');
const router = express.Router();
const verifyUser = require('../util/verifyUser');
const verifyAdmin = require('../util/verifyAdmin');

const userController = require('../app/controllers/UserController');

// check authentication token
// router.get('/authentication/:id', verifyUser, (req, res, next) => {
//   res.send('hello user, you are logged in');
// });

// user
router.put('/:id', verifyUser, userController.update);

// admin
router.post('/handle-form-actions', verifyAdmin, userController.handleDeleteFormActions);
router.post('/handle-trash-form-actions', verifyAdmin, userController.handleTrashFormActions);
router.patch('/:id/restore', verifyAdmin, userController.restore);
router.delete('/:id', verifyAdmin, userController.destroy);
router.delete('/:id/force', verifyAdmin, userController.forceDestroy);

module.exports = router;
