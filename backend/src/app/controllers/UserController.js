class UserController {
  index(req, res, next) {
    res.send('user controller');
  }
}

module.exports = new UserController();
