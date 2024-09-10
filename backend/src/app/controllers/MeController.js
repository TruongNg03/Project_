const Activity = require('../models/Activity');
const User = require('../models/User');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');
const Profile = require('../models/Profile');
const Blood = require('../models/Blood');
const Hospital = require('../models/Hospital');

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
        const { hospital, id } = req.query;

        if (hospital) {
          if (hospital === 'Tất cả') {
            res.status(200).json(activities);
          }

          Activity.find({ hospital: req.query.hospital })
            .then((activity) => {
              res.status(200).json(activity);
            })
            .catch(next);
        } else if (id) {
          Activity.findById({ _id: req.query.id })
            .then((activity) => {
              res.status(200).json(activity);
            })
            .catch(next);
        } else {
          res.status(200).json(activities);
        }
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

  // [GET] /me/trash/users
  trashUsers(req, res, next) {
    User.findWithDeleted({ deleted: true })
      .sortable(req)
      .lean()
      .then((activities) => res.status(200).json({ activities }))
      .catch(next);
  }

  // users
  // [GET] /me/stored/users-account?id={_id}&_sort&column={...}&type={asc/desc}
  storedUsers(req, res, next) {
    Promise.all([User.find({}).sortable(req)])
      .then(([users]) => {
        const { id } = req.query;
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

  // [GET] /me/stored/hospitals
  storedHospitals(req, res, next) {
    Promise.all([Hospital.find({})])
      .then(([hospital]) => {
        res.status(200).json(hospital);
      })
      .catch(next);
  }
}

module.exports = new MeController();
