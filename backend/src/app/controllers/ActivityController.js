const Activity = require('../models/Activity');

class ActivityController {
  // [GET] /activity/create
  create(req, res, next) {
    res.render('activities/create');
  }

  // [POST] /activity/create
  store(req, res, next) {
    const activity = new Activity(req.body);
    activity
      .save()
      .then(() => res.status(200).json(req.body))
      .catch(next);
  }

  // [GET] /:id/edit (render edit page)
  edit(req, res, next) {
    Activity.findById(req.params.id)
      .lean()
      .then((activity) => res.render('activities/edit', { activity }))
      .catch(next);
  }

  // [PUT] /activities/:id (update activity)
  update(req, res, next) {
    Activity.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.status(200).json(req.body))
      .catch(next);
  }

  // [DELETE] /activities/:id
  destroy(req, res, next) {
    Activity.delete({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted!' }))
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

  // [POST] /activities/handle-form-actions
  handleDeleteFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        Activity.delete({ _id: { $in: req.body.activityIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' });
    }
  }

  // [POST] /activities/handle-trash-form-action
  handleTrashFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete-force':
        Activity.deleteMany({ _id: { $in: req.body.activityIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restored':
        Activity.restore({ _id: { $in: req.body.activityIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' });
    }
  }
}

module.exports = new ActivityController();
