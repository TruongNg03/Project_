const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/activities', meController.storedActivities);
router.get('/trash/activities', meController.trashActivities);

module.exports = router;
