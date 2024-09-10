const Hospital = require('../models/Hospital');

class HospitalController {
  // [GET] /hospital/create
  index(req, res, next) {
    res.render('hospital');
  }

  // [GET] /hospital/stored
  getHospital(req, res, next) {
    Hospital.findById({ _id: req.params.id })
      .then((hospital) => res.status(200).json(hospital))
      .catch(next);
  }

  // [POST] /hospital/stored
  store(req, res, next) {
    const hospital = new Hospital(req.body);
    hospital
      .save()
      .then(() => res.status(200).json({ message: 'created!' }))
      .catch(next);
  }

  // [PUT] /hospital/:id/edit
  edit(req, res, next) {
    Hospital.updateOne({ _id: req.params.id }, req.body)
      .lean()
      .then(() => res.status(200).json({ message: 'created!' }))
      .catch(next);
  }

  // [DELETE] /hospital/:id
  destroy(req, res, next) {
    Hospital.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'deleted force hospital!' }))
      .catch(next);
  }
}

module.exports = new HospitalController();
