const Activity = require('../models/Activity');
const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const Profile = require('../models/Profile');
const Blood = require('../models/Blood');

class MeController {
  // activity
  // [GET] /me/stored/activities
  storedActivities(req, res, next) {
    // Promise.all([Activity.find({}).sortable(req), Activity.countDocumentsWithDeleted({ deleted: true })])
    //   .then(([activities, deletedCount]) => {
    //     res.render('me/stored-activities', {
    //       deletedCount,
    //       activities: multipleMongooseToObject(activities),
    //     });
    //   })
    //   .catch(next);

    Promise.all([Activity.find({})])
      .then(([activities]) => {
        res.status(200).json(activities);
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

  // users
  // [GET] /me/stored/users-account?id={_id}&_sort&column={...}&type={asc/desc}
  storedUsers(req, res, next) {
    Promise.all([User.find({}).sortable(req)])
      .then(([users]) => {
        const { id, sort } = req.query;
        const parseId = parseInt(id);

        if (!isNaN(parseId)) {
          User.findById({ _id: req.query.id })
            .then((user) => {
              res.status(200).json(user);
            })
            .catch(next);
        } else {
          res.status(200).json(users);
        }
      })
      .catch(next);
  }

  // [GET] /me/stored/users-profile
  storedProfiles(req, res, next) {
    Promise.all([Profile.find({})])
      .then(([profiles]) => {
        res.status(200).json(profiles);
      })
      .catch(next);
  }

  // [GET] /me/stored/users-blood
  storedBloods(req, res, next) {
    Promise.all([Blood.find({})])
      .then(([bloods]) => {
        res.status(200).json(bloods);
      })
      .catch(next);
  }
}

module.exports = new MeController();
