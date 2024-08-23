const User = require('../models/User');
const Profile = require('../models/Profile');

class UserController {
  // [PUT] /users/:id (update user)
  update(req, res, next) {
    User.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.redirect('/me/stored/users'))
      .catch(next);
  }

  // [DELETE] /users/:id
  destroy(req, res, next) {
    User.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [DELETE] /users/:id/force
  forceDestroy(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [PATCH] /users/:id/restore
  restore(req, res, next) {
    User.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [POST] /users/handle-form-actions
  handleDeleteFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        User.delete({ _id: { $in: req.body.userIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' });
    }
  }

  // [POST] /users/handle-trash-form-action
  handleTrashFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete-force':
        User.deleteMany({ _id: { $in: req.body.userIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      case 'restored':
        User.restore({ _id: { $in: req.body.userIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;
      default:
        res.json({ message: 'Action is invalid!' });
    }
  }
}

module.exports = new UserController();
