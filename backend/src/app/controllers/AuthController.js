const User = require('../models/User');

class AuthController {
  index(req, res, next) {
    res.render('auth');
  }

  // [POST] /auth/register/store
  register(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then(() => res.redirect('/auth/register'))
      .catch(next);
  }
}

module.exports = new AuthController();
