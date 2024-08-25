const express = require('express');
const router = express.Router();

const profileController = require('../app/controllers/ProfileController');

router.get('/:id', profileController.userProfile);
router.put('/:id/:activityId', profileController.addOneActivity);

module.exports = router;
