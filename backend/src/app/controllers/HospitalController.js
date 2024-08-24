const Hospital = require('../models/Hospital');

class HospitalController {
  // [GET] /hospital/create
  index(req, res, next) {
    res.render('hospital');
  }

  // [POST] /hospital/create/stored
  store(req, res, next) {
    const hospital = new Hospital(req.body);
    hospital
      .save()
      .then(() => res.redirect('/hospital/create'))
      .catch(next);
  }
}

module.exports = new HospitalController();
