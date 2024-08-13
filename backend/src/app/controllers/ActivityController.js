const Activity = require('../models/Activity');

class ActivityController {
  // [GET] /activity/create
  create(req, res, next) {
    res.render('activities/create');
  }

  // [POST] /activity/store
  store(req, res, next) {
    const activity = new Activity(req.body);
    activity
      .save()
      .then(() => res.redirect('/me/stored/activities'))
      .catch(next);
  }

  // [DELETE] /activities/:id
  destroy(req, res, next) {
    Activity.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /activities/:id/force
  forceDestroy(req, res, next) {
    Activity.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /activities/:id/restore
  restore(req, res, next) {
    Activity.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new ActivityController();
