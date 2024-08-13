const Activity = require('../models/Activity');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const { param } = require('../../routes/activity');

class MeController {
  // activity
  // [GET] /me/stored/activities
  storedActivities(req, res, next) {
    Promise.all([
      Activity.find({}).sortable(req),
      Activity.countDocumentsWithDeleted({ deletedAt: true })
    ])
      .then(([activities, deleteCount]) => {
        res.render('me/stored-activities', {
          deleteCount,
          activities: multipleMongooseToObject(activities),
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/activities
  trashActivities(req, res, next) {
    Activity.findWithDeleted({ deleted: true })
      .lean()
      .then((activities) => res.render('me/trash-activities', { activities }))
      .catch(next);
  }
}

module.exports = new MeController();
