const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/ProfileController');

router.get('/:id', profileController.userProfile);
router.put('/:id/edit', profileController.changeProfile);
router.put('/:id/:activityId', profileController.addOneActivity);
router.put('/:id/:background', profileController.changeBackground);

module.exports = router;
