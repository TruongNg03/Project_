const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

class AuthController {
  index(req, res, next) {
    res.render('register');
  }

  // [POST] /auth/register
  register(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      ...req.body,
      password: hash,
    });

    user
      .save()
      .then((user) => {
        // create default user info
        const profile = new Profile({
          ...req.body,
          userId: user._id,
        });

        profile
          .save()
          .then(() => res.status(200).send('User has been created.'))
          .catch(next);
      })
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
          return res.status(400).json({ message: 'Wrong username or password!' });
        }

        // not alert on screen
        bcrypt
          .compare(pass, user.password)
          .then((result) => {
            if (!result) {
              return res.status(400).json({ message: 'Wrong username or password!' });
            }

            const token = jwt.sign(
              { id: user._id, admin: user.admin },
              process.env.JWT_SECRET, // 'admin_00' -> process.env.JWt_SECRET
              { expiresIn: '1 days' }, // 10s
            );

            const { password, ...otherDetails } = user._doc;
            res
              .cookie('access_token', token, {
                httpOnly: true,
              })
              .status(200)
              .json({ ...otherDetails });
          })
          .catch(next);
      })
      .catch(next);
  }
}

module.exports = new AuthController();
