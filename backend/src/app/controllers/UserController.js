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

  // [DELETE] /user/:id
  destroy(req, res, next) {
    User.delete({ _id: req.params.id })
      .then(() => {
        Profile.updateOne({ userId: req.params.id }, { deleted: true })
          .then(() => {
            res.status(200).json({ message: 'deleted user' });
          })
          .catch(next);
      })
      .catch(next);
  }

  // [DELETE] /user/:id/force
  forceDestroy(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'deleted force user' }))
      .catch(next);
  }

  // [PATCH] /user/:id/restore
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
