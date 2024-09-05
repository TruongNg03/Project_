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

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    User.findOne({ username: req.body.username })
      .then((findUsername) => {
        // check username
        if (findUsername) {
          return res.status(400).json({ message: 'Username is validated!' });
        } else {
          User.findOne({ identity: req.body.identity })
            .then((findIdentity) => {
              // check identity
              if (findIdentity) {
                return res.status(400).json({ message: 'Identity is validated!' });
              } else {
                newUser
                  .save()
                  .then((user) => {
                    // create default user info
                    const profile = new Profile({
                      ...req.body,
                      userId: user._id,
                    });

                    profile
                      .save()
                      .then(() => res.status(200).json('User has been created!'))
                      .catch(next);
                  })
                  .catch(next);
              }
            })
            .catch(next);
        }
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
