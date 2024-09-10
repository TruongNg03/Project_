const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/hospitals', meController.storedHospitals);
router.get('/stored/activities', meController.storedActivities);
router.get('/trash/activities', meController.trashActivities);
router.get('/trash/users', meController.trashUsers);
router.get('/stored/users-account', meController.storedUsers);
router.get('/stored/users-blood', meController.storedBloods);
router.get('/stored/users-profile', meController.storedProfiles);

module.exports = router;
