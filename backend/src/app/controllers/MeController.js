const Activity = require('../models/Activity');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const { param } = require('../../routes/activity');

class MeController {
  // activity
  // [GET] /me/stored/activities
  storedActivities(req, res, next) {
    Promise.all([
        Activity.find({}).sortable(req),
        Activity.countDocumentsWithDeleted({ deleted: true })
      ])
      .then(([activities, deletedCount]) => {
        res.render('me/stored-activities', {
          deletedCount,
          activities: multipleMongooseToObject(activities),
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/activities
  trashActivities(req, res, next) {
    Activity.findWithDeleted({ deleted: true })
      .sortable(req)
      .lean()
      .then((activities) => res.render('me/trash-activities', { activities }))
      .catch(next);
  }
}

module.exports = new MeController();
