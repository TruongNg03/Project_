const Profile = require('../models/Profile');

class ProfileController {
  // [GET] /profile/:id
  userProfile(req, res, next) {
    Profile.findOne({ userId: req.params.id })
      .then((profile) => res.status(200).json(profile))
      .catch(next);
  }

  // [PUT] /profile/:id/edit
  changeProfile(req, res, next) {
    Profile.updateOne({ userId: req.params.id }, req.body)
      .lean()
      .then(() => res.status(200).json())
      .catch();
  }

  // [PUT] /profile/:id/:activityId
  addOneActivity(req, res, next) {
    Profile.updateOne({ userId: req.params.id }, req.body)
      .lean()
      .then(() => res.status(200).json())
      .catch();
  }

  // [PUT] /profile/:id/:background
  changeBackground(req, res, next) {
    Profile.updateOne({ background: req.params.background }, req.body)
      .lean()
      .then(() => res.status(200).json())
      .catch();
  }
}

module.exports = new ProfileController();
