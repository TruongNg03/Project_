const Blood = require('../models/Blood');

class BloodController {
  create(req, res, next) {
    res.render('bloods/create');
  }

  // [POST] /auth/register/store
  store(req, res, next) {
    const blood = new Blood(req.body);
    blood
      .save()
      .then(() => res.redirect('/bloods/create'))
      .catch(next);
  }
}

module.exports = new BloodController();
