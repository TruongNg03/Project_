const User = require('../model/User');
const bcrypt = require('bcrypt');

class RegisterController {
  index(req, res, next) {
    res.render('register');
  }

  // [POST] /auth/register
  registerUser(req, res, next) {
    // create new user
    const newUser = new User(req.body);

    // save to db
    newUser
      .save()
      .then(() => res.redirect('/auth/register'))
      .catch(next);
  }

  loginUser(req, res, next) {
    User.findOne({ username: req.params.username })
      .lean()
      .then((user, password) => {
        if (!user) {
          res.status(404).json('Wrong username!');
        }
        if (!password) {
          res.status(404).json('Wrong username!');
        }
        if (user && password) {
          res.status(200).json(user);
        }
      })
      .catch(next);
  }
}

module.exports = new RegisterController();
