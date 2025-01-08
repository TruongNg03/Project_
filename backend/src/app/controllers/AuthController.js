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
      passwordUnHash: req.body.password,
    });

    // check username
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Tài khoản đã tồn tại!' });
        }
      })
      .catch(next);

    User.findOneWithDeleted({ deleted: true, username: req.body.username })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Tài khoản đã bị khóa!' });
        }
      })
      .catch(next);

    // check identity
    User.findOne({ identity: req.body.identity })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Identity đã tồn tại!' });
        }
      })
      .catch(next);

    User.findOneWithDeleted({ deleted: true, identity: req.body.identity })
      .then((user) => {
        if (user) {
          return res.status(400).json({ message: 'Identity đã tồn tại!' });
        }
      })
      .catch(next);

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

  // [GET] /auth/login
  renderLogin(req, res, next) {
    res.render('login');
  }

  // [POST] /auth/login
  login(req, res, next) {
    const checkUser = req.body;

    User.findOne({ username: req.body.username })
      .then((user) => {
        if (!user) {
          // check in deleted account
          User.findDeleted({ deleted: true, username: checkUser.username })
            .then((deletedUser) => {
              if (deletedUser.length) {
                return res.status(400).json({ message: 'Tài khoản đã bị khóa!' });
              } else {
                return res.status(400).json({ message: 'Tài khoản không tồn tại!' });
              }
            })
            .catch(next);
        } else {
          bcrypt
            .compare(checkUser.password, user.password)
            .then((result) => {
              if (!result) {
                return res.status(400).json({ message: 'Tài khoản hoặc mật khẩu sai!' });
              }

              // show username when login
              console.log('-- ' + user.username + ' login');

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
        }
      })
      .catch(next);
  }
}

module.exports = new AuthController();
