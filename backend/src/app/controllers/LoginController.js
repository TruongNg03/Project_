const User = require('../model/User');

class LoginController {
  index(req, res, next) {
    res.render('login');
  }

  loginUser(req, res, render) {}
}

module.exports = new LoginController();
