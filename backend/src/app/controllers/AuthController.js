const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  index(req, res, next) {
    res.render('register');
  }

  // [POST] /auth/register
  register(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      identity: req.body.identity,
    });

    user
      .save()
      .then(() => res.status(200).send('User has been created.'))
      .catch(next);
  }

  // [GET] /auth/login
  renderLogin(req, res, next) {
    res.render('login');
  }

  // [POST] /auth/login
  login(req, res, next) {
    const pass = req.body.password;
    User.findOne({ username: req.body.username })
      .then((user) => {
        // not alert on screen
        if (!user) {
          return res.send('User not found!');
        }

        // not alert on screen
        bcrypt
          .compare(pass, user.password)
          .then((result) => {
            if (!result) {
              res.send('Password is incorrect!');
            } else {
              const token = jwt.sign(
                { id: user._id, admin: user.admin },
                process.env.JWT_SECRET, // 'admin_00' -> process.env.JWt_SECRET
                { expiresIn: '3600' }, //1 hour
              );

              const { password, ...otherDetails } = user._doc;
              res
                .cookie('access_token', token, {
                  httpOnly: true,
                })
                .status(200)
                .json({ ...otherDetails });
            }
          })
          .catch(next);
      })
      .catch(next);
  }
}

module.exports = new AuthController();
